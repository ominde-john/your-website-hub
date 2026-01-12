import type { VercelRequest, VercelResponse } from "@vercel/node";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    return res.status(500).json({ error: "Server misconfigured - Stripe key missing" });
  }

  try {
    const { items, successUrl, cancelUrl } = req.body as {
      items: CartItem[];
      successUrl: string;
      cancelUrl: string;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    // Create line items for Stripe Checkout
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "kes", // Kenyan Shilling
        product_data: {
          name: item.product.name,
          images: item.product.image.startsWith("http") 
            ? [item.product.image] 
            : [], // Only include absolute URLs
        },
        unit_amount: item.product.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session using REST API
    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "payment",
        "success_url": successUrl || `${req.headers.origin}/checkout/success`,
        "cancel_url": cancelUrl || `${req.headers.origin}/checkout/cancel`,
        ...lineItems.reduce((acc, item, index) => ({
          ...acc,
          [`line_items[${index}][price_data][currency]`]: item.price_data.currency,
          [`line_items[${index}][price_data][product_data][name]`]: item.price_data.product_data.name,
          [`line_items[${index}][price_data][unit_amount]`]: item.price_data.unit_amount.toString(),
          [`line_items[${index}][quantity]`]: item.quantity.toString(),
        }), {}),
      }).toString(),
    });

    if (!stripeResponse.ok) {
      const errorData = await stripeResponse.text();
      console.error("Stripe error:", errorData);
      return res.status(500).json({ error: "Failed to create checkout session" });
    }

    const session = await stripeResponse.json();

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Checkout error:", err);
    return res.status(500).json({ error: "Server error during checkout" });
  }
}

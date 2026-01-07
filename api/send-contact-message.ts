import type { VercelRequest, VercelResponse } from "@vercel/node";

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers - restrict to same origin in production
  const allowedOrigins = [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null,
    "http://localhost:8080",
    "http://localhost:3000",
  ].filter(Boolean);
  
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  if (!WEB3FORMS_ACCESS_KEY) {
    console.error("Missing WEB3FORMS_ACCESS_KEY");
    return res.status(500).json({ success: false, message: "Server misconfigured" });
  }

  try {
    const { name, email, message, captchaToken } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: name, email, and message are required" 
      });
    }

    const payload: Record<string, string> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message,
    };

    if (captchaToken) {
      payload["g-recaptcha-response"] = captchaToken;
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true, message: "Message sent successfully" });
    } else {
      console.error("Web3Forms error:", data);
      return res.status(400).json({ 
        success: false, 
        message: data.message || "Failed to send message" 
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

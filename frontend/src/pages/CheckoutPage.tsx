import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";

const CheckoutPage = () => {
  const { items, totalItems, totalPrice, clearCart, isAuthenticated } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to proceed with checkout.",
        variant: "destructive",
      });
      navigate("/auth", { state: { from: "/checkout" } });
    }
  }, [isAuthenticated, navigate, toast]);

  // Redirect if cart is empty (only when authenticated)
  useEffect(() => {
    if (items.length === 0 && isAuthenticated) {
      navigate("/marketplace");
    }
  }, [items, navigate]); // isAuthenticated check is inside the condition

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            product: {
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              image: item.product.image,
            },
            quantity: item.quantity,
          })),
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout/cancel`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during checkout");
      toast({
        title: "Checkout Error",
        description: err instanceof Error ? err.message : "Failed to initiate checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <PageHeader
        title="Checkout"
        description="Complete your purchase securely"
      />

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <Button
            variant="ghost"
            className="mb-6 text-gray-400 hover:text-white"
            onClick={() => navigate("/marketplace")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2">
              <Card className="bg-[#111827] border border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ShoppingCart className="w-5 h-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 rounded-lg bg-gray-800/50"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md bg-gray-700"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-white">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-techblue font-semibold">
                          Ksh {(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="md:col-span-1">
              <Card className="bg-[#111827] border border-gray-800 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-white">Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="text-white">
                      Ksh {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between">
                    <span className="font-medium text-white">Total</span>
                    <span className="text-xl font-bold text-techblue">
                      Ksh {totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    className="w-full bg-[#635bff] hover:bg-[#5146e8] text-white"
                    onClick={handleStripeCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay with Stripe
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Secure payment powered by Stripe
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;

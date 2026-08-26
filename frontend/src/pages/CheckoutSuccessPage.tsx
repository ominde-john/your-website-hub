import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag, Home } from "lucide-react";

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();

  // Clear the cart on successful payment
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-[#111827] border border-gray-800 text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-white">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">
            Thank you for your purchase. Your order has been confirmed and you
            will receive an email confirmation shortly.
          </p>
          <div className="p-4 rounded-lg bg-gray-800/50">
            <p className="text-sm text-gray-500">
              If you have any questions about your order, please contact our
              support team.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full bg-techblue hover:bg-techblue-dark"
          >
            <Link to="/marketplace">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutSuccessPage;

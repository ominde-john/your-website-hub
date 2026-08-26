import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react";

const CheckoutCancelPage = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-[#111827] border border-gray-800 text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-white">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">
            Your payment was cancelled. Don't worry, your cart items are still
            saved and you can try again whenever you're ready.
          </p>
          <div className="p-4 rounded-lg bg-gray-800/50">
            <p className="text-sm text-gray-500">
              If you experienced any issues during checkout, please contact our
              support team for assistance.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full bg-techblue hover:bg-techblue-dark"
          >
            <Link to="/checkout">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Return to Checkout
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800"
          >
            <Link to="/marketplace">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutCancelPage;

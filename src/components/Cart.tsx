import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg bg-white dark:bg-gray-900">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({totalItems})
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400">
            Review your items before checkout
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
            <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Browse our marketplace and add products to your cart
            </p>
            <Button
              asChild
              className="bg-techblue hover:bg-techblue-dark"
              onClick={closeCart}
            >
              <Link to="/marketplace">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/marketplace/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md bg-gray-200 dark:bg-gray-700"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/marketplace/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="hover:text-techblue transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                      </Link>
                      <p className="text-sm text-techblue font-semibold mt-1">
                        Ksh {item.product.price.toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Ksh {totalPrice.toLocaleString()}
                </span>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-xl font-bold text-techblue">
                  Ksh {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    const message = items
                      .map(
                        (item) =>
                          `${item.quantity}x ${item.product.name} @ Ksh ${item.product.price.toLocaleString()}`
                      )
                      .join("\n");
                    const totalMsg = `\n\nTotal: Ksh ${totalPrice.toLocaleString()}`;
                    const whatsappUrl = `https://wa.me/254115000514?text=${encodeURIComponent(
                      `Hi, I'd like to order:\n\n${message}${totalMsg}`
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                >
                  Checkout via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

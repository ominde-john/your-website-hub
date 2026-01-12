import * as React from "react";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "teksoft-cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage might be full or disabled
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  // Load cart from localStorage on mount
  React.useEffect(() => {
    setItems(loadCartFromStorage());
  }, []);

  // Save cart to localStorage whenever items change
  React.useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addToCart = React.useCallback((product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { product, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = React.useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }, []);

  const updateQuantity = React.useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = React.useCallback(() => {
    setItems([]);
  }, []);

  const openCart = React.useCallback(() => setIsOpen(true), []);
  const closeCart = React.useCallback(() => setIsOpen(false), []);
  const toggleCart = React.useCallback(() => setIsOpen((prev) => !prev), []);

  const totalItems = React.useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = React.useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const value = React.useMemo(
    () => ({
      items,
      isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      totalItems,
      totalPrice,
    }),
    [
      items,
      isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      totalItems,
      totalPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

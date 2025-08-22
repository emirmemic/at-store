'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  clearCart as clearBackendCart,
  updateCart as updateBackendCart,
} from './actions';

import { CART_KEY } from '@/lib/constants';
import { ShoppingCartItem } from '@/lib/types';
import debounce from 'lodash.debounce';
import { useUserProvider } from './user-provider';

export type CartContextType = {
  cart: ShoppingCartItem[];
  updateCart: (cartItem: ShoppingCartItem) => Promise<void>;
  setCart: (cart: ShoppingCartItem[]) => void;
  getTotalPrice: () => number;
  getFinalPrice: () => number; // New method for final price with installments
  setInstallmentPrice: (price: number | null) => void; // New method to set installment price
  installmentPrice: number | null; // New state for installment price
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  updateCart: async () => {},
  setCart: () => {},
  getTotalPrice: () => {
    return 0;
  },
  getFinalPrice: () => {
    return 0;
  },
  setInstallmentPrice: () => {},
  installmentPrice: null,
  clearCart: () => {},
});

// Map to store debounced functions per product
const debouncedUpdateMap = new Map<string, (quantity: number) => void>();

export default function CartProvider({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: ShoppingCartItem[];
}) {
  const [cart, setCart] = useState<ShoppingCartItem[]>(initialValue);
  const [installmentPrice, setInstallmentPrice] = useState<number | null>(null);
  const { user } = useUserProvider();

  // Initialize the cart in local storage when the component mounts and the user is a guest user
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user) {
      setCart(getCartFromLocalStorage());
    }
  }, [user]);

  // Get or create a persistent debounced updater for a product
  function getDebouncedUpdate(documentId: string) {
    if (!debouncedUpdateMap.has(documentId)) {
      debouncedUpdateMap.set(
        documentId,
        debounce((quantity: number) => {
          updateBackendCart(documentId, quantity);
        }, 300)
      );
    }
    return debouncedUpdateMap.get(documentId) as (quantity: number) => void;
  }

  // Update the cart with the new changes
  const updateCart = async (cartItem: ShoppingCartItem): Promise<void> => {
    let updatedCart: ShoppingCartItem[];
    const productExists = cart.some(
      (item) => item.product.id === cartItem.product.id
    );

    if (cartItem.quantity === 0) {
      // Remove the item if quantity is 0
      updatedCart = cart.filter(
        (item) => item.product.id !== cartItem.product.id
      );
    } else if (productExists) {
      // Update quantity of existing item
      updatedCart = cart.map((item) =>
        item.product.id === cartItem.product.id
          ? { ...item, quantity: cartItem.quantity }
          : item
      );
    } else {
      // Add new item to cart
      updatedCart = [...cart, cartItem];
    }

    // Update the cart items in the state
    setCart(updatedCart);

    // Reset installment price when cart changes
    setInstallmentPrice(null);

    if (user) {
      // Debounced backend update: only the last call in a burst will be sent
      getDebouncedUpdate(cartItem.product.documentId)(cartItem.quantity);
    } else {
      // Update the cart in local storage
      updateCartInLocalStorage(updatedCart);
    }
  };

  function getTotalPrice() {
    return cart.reduce(
      (total, { product: { discountedPrice, originalPrice }, quantity }) =>
        total + (discountedPrice || originalPrice) * quantity,
      0
    );
  }

  // New method to get final price (with installments if available)
  function getFinalPrice() {
    return installmentPrice !== null ? installmentPrice : getTotalPrice();
  }

  function clearCart() {
    setCart([]);
    setInstallmentPrice(null); // Reset installment price when clearing cart
    if (user) {
      // Clear the cart in the server
      clearBackendCart();
    } else {
      // Clear the cart in local storage
      updateCartInLocalStorage([]);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
        setCart,
        getTotalPrice,
        getFinalPrice,
        setInstallmentPrice,
        installmentPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartProvider() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartProvider must be used within CartProvider');
  }
  return context;
}

//* Helper Functions
export function getCartFromLocalStorage(): ShoppingCartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  if (!cart) {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(cart) as ShoppingCartItem[];
  } catch {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    return [];
  }
}

export function updateCartInLocalStorage(cart: ShoppingCartItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

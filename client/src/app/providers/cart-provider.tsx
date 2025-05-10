'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CART_KEY } from '@/lib/constants';
import { ShoppingCartItem } from '@/lib/types';

import { updateCart as updateBackendCart } from './actions';
import { useUserProvider } from './user-provider';

export type CartContextType = {
  cart: ShoppingCartItem[];
  updateCart: (cartItem: ShoppingCartItem) => Promise<void>;
  setCart: (cart: ShoppingCartItem[]) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  updateCart: async () => {},
  setCart: () => {},
});

export default function CartProvider({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: ShoppingCartItem[];
}) {
  const [cart, setCart] = useState<ShoppingCartItem[]>(initialValue);
  const { user } = useUserProvider();

  // Initialize the cart in local storage when the component mounts and the user is a guest user
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user) {
      setCart(getCartFromLocalStorage());
    }
  }, [user]);

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

    if (user) {
      // Update the cart in the server
      await updateBackendCart(cartItem.product.id, cartItem.quantity);
    } else {
      // Update the cart in local storage
      updateCartInLocalStorage(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, setCart }}>
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

function updateCartInLocalStorage(cart: ShoppingCartItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

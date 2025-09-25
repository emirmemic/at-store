'use client';

import { useEffect, useRef } from 'react';
import { useCartProvider, getCartFromLocalStorage } from './cart-provider';
import { useUserProvider } from './user-provider';
import { getCart } from '@/lib/services/get-cart';

export default function CartSynchronizer() {
  const { user } = useUserProvider();
  const { mergeWithGuestCart } = useCartProvider();
  const hasUserChangedRef = useRef<boolean>(false);
  const prevUserRef = useRef(user);

  useEffect(() => {
    // Check if user just logged in (went from null to user)
    if (!prevUserRef.current && user && !hasUserChangedRef.current) {
      // User just logged in - fetch their cart from server and merge with guest cart
      const syncCarts = async () => {
        const guestCart = getCartFromLocalStorage();
        // Always fetch user's cart from server
        const userCart = await getCart();

        const shouldSyncBackend = guestCart.length > 0;
        await mergeWithGuestCart(userCart, {
          syncBackend: shouldSyncBackend,
        });
      };

      syncCarts().catch((error) => {
        console.error('Failed to synchronize carts', error);
      });
      hasUserChangedRef.current = true;
    }

    // Update the previous user reference
    prevUserRef.current = user;

    // Reset the flag when user logs out
    if (!user) {
      hasUserChangedRef.current = false;
    }
  }, [user, mergeWithGuestCart]);

  return null; // This component doesn't render anything
}

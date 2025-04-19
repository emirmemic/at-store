'use client';
import { RefObject, useEffect } from 'react';

/**
 * This hook is used to handle clicks outside of a given element.
 * It can be used to close a dropdown menu, for example.
 *
 * @param ref - The ref of the element to handle clicks outside of.
 * @param handleOnClickOutside - The function to call when a click outside the element occurs.
 * @param excludeRefs - An array of refs of elements that should not trigger the handleOnClickOutside function.
 */
export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void,
  excludeRefs: RefObject<HTMLElement | null>[] = []
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // If the click is within any of the excludeRefs, do nothing.
      if (
        excludeRefs.some(
          (excludeRef) =>
            excludeRef.current &&
            excludeRef.current.contains(event.target as Node)
        )
      ) {
        return;
      }

      // If the click is within the ref, do nothing.
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // If the click is outside the ref, call the handleOnClickOutside function.
      handleOnClickOutside(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, excludeRefs, handleOnClickOutside]);
}

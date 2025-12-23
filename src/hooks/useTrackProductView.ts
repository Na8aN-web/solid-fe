// Optional: Create this custom hook for easier tracking across components

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addRecentlyViewed } from "../store/slices/userSlice";

/**
 * Custom hook to track when a user views a product
 * @param productId - The ID of the product being viewed
 * @param delay - Delay in milliseconds before tracking (default: 1000ms)
 */
export const useTrackProductView = (productId: string | undefined, delay: number = 1000) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!productId || !isAuthenticated) {
      return;
    }

    // Add a delay to ensure user actually viewed the page
    const timer = setTimeout(() => {
      dispatch(addRecentlyViewed(productId))
        .unwrap()
        .then(() => {
          console.log(`Product ${productId} added to recently viewed`);
        })
        .catch((error) => {
          console.error("Failed to track product view:", error);
        });
    }, delay);

    return () => clearTimeout(timer);
  }, [productId, isAuthenticated, delay, dispatch]);
};
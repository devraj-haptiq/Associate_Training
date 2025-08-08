import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchAllWatches } from "../api/watchApi";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("wishlistItems");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Failed to parse wishlist items from localStorage", error);
      return [];
    }
  });

  const [allWatches, setAllWatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("wishlistItems", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save wishlist items to localStorage", error);
    }
  }, [items]);

  useEffect(() => {
    const getWatches = async () => {
      try {
        const watchesData = await fetchAllWatches();
        setAllWatches(watchesData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch watches.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getWatches();
  }, []);

  const addToWishlist = (watchId) => {
    setItems((prevItems) => {
      if (!prevItems.includes(watchId)) {
        return [...prevItems, watchId];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (watchId) => {
    setItems((prevItems) => prevItems.filter((id) => id !== watchId));
  };

  const isItemInWishlist = (watchId) => {
    return items.includes(watchId);
  };

  const value = {
    wishlistItems: items,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    allWatches,
    isLoading,
    error,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

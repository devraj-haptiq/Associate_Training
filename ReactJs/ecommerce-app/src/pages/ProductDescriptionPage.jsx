import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchWatchById } from "../api/watchApi";
import { useWishlist } from "../context/WishlistContext";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import ProductTile from "../components/ProductTile";
import toast from "react-hot-toast";

export default function ProductDescriptionPage() {
  const { productId } = useParams();
  const [watch, setWatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { allWatches, addToWishlist, removeFromWishlist, isItemInWishlist } =
    useWishlist();
  const dispatch = useDispatch();

  useEffect(() => {
    const getWatchDetails = async () => {
      try {
        setIsLoading(true);
        const watchData = await fetchWatchById(productId);
        setWatch(watchData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getWatchDetails();
    window.scrollTo(0, 0);
  }, [productId]);

  const similarProducts = useMemo(() => {
    if (!watch || allWatches.length === 0) return [];
    return allWatches
      .filter((w) => w.brand === watch.brand && w.id !== watch.id)
      .slice(0, 4);
  }, [watch, allWatches]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error || !watch)
    return <div className="text-center py-10">404 - Watch Not Found</div>;

  const isInWishlist = isItemInWishlist(watch.id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(watch.id);
      toast("Item removed from wishlist.");
    } else {
      addToWishlist(watch.id);
      toast.success("Item added to wishlist!");
    }
  };

  const handleAddToCart = () => {
    if (!watch.in_stock) {
      toast.error("This item is currently out of stock.");
      return;
    }
    dispatch(addItemToCart(watch));
    toast.success("Item added to cart!");
  };

  const { name, brand, price, image_url, in_stock, rating, description } =
    watch;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="md:w-1/2">
          <img
            className="w-full h-auto rounded-lg shadow-xl object-contain"
            src={image_url}
            alt={`Image of ${name}`}
          />
        </div>
        <div className="md:w-1/2 flex flex-col">
          <p className="text-lg text-gray-500">{brand}</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-1">
            {name}
          </h1>
          <p className="my-4 text-3xl font-light text-gray-800">
            ₹{price.toLocaleString("en-IN")}
          </p>
          <div className="flex items-center gap-4 my-2">
            <p
              className={`text-md font-semibold px-3 py-1 rounded-full ${
                in_stock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {in_stock ? "In Stock" : "Out of Stock"}
            </p>
            <div className="flex items-center text-md text-gray-700 bg-yellow-100 px-3 py-1 rounded-full">
              <span>{rating}</span>
              <span className="ml-1 text-yellow-500">⭐</span>
            </div>
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed">
            {description || "No description available."}
          </p>
          <div className="mt-auto flex items-center gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              disabled={!in_stock}
              className={`flex-grow rounded-md py-3 px-8 font-semibold text-white transition-colors text-lg ${
                in_stock
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {in_stock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={handleWishlistClick}
              className="p-3 rounded-md border-2 border-gray-300 transition-colors"
            >
              <i
                className={`fa-heart text-2xl ${
                  isInWishlist
                    ? "fa-solid text-red-500"
                    : "fa-regular text-gray-500"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-3xl font-bold text-center mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((similarWatch) => (
              <ProductTile key={similarWatch.id} watch={similarWatch} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

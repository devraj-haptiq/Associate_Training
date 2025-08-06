import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

export default function ProductTile({ watch }) {
  const { id, name, brand, price, image_url, in_stock, rating } = watch;
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
  const dispatch = useDispatch();

  const isInWishlist = isItemInWishlist(id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(id);
      alert("Item removed from wishlist.");
    } else {
      addToWishlist(id);
      alert("Item added to wishlist!");
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!in_stock) {
      return;
    }
    dispatch(addItemToCart(watch));
  };

  return (
    <Link
      to={`/products/${id}`}
      className="transform overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col no-underline"
    >
      <div className="relative">
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm"
        >
          <i
            className={`fa-heart text-xl ${
              isInWishlist
                ? "fa-solid text-red-500"
                : "fa-regular text-gray-700"
            }`}
          ></i>
        </button>

        <img
          className="h-60 w-full rounded-t-lg object-contain p-2"
          src={image_url}
          alt={`Image of ${name}`}
        />
      </div>

      <div className="p-4 text-center flex flex-col flex-grow">
        <div className="mb-4">
          <p className="mb-1 text-sm text-gray-500">{brand}</p>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="my-2 text-xl font-bold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </p>
          <p
            className={`text-sm font-medium ${
              in_stock ? "text-green-600" : "text-red-600"
            }`}
          >
            {in_stock ? "In Stock" : "Out of Stock"}
          </p>
          <div className="mt-2 flex items-center justify-center text-sm text-gray-700">
            <span>{rating} / 5.0</span>
            <span className="ml-1">⭐</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!in_stock}
          className={`mt-auto block w-full rounded-md py-2 px-4 text-center font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            in_stock
              ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {in_stock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  );
}

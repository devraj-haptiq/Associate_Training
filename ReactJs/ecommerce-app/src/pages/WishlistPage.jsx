import React from "react";
import { Link } from "react-router-dom";
import ProductTile from "../components/ProductTile";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems, allWatches, isLoading } = useWishlist();

  const wishlistedWatches = allWatches.filter((watch) =>
    wishlistItems.includes(watch.id)
  );

  if (isLoading) {
    return <div className="text-center py-10">Loading Wishlist...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        My Wishlist
      </h1>

      {wishlistedWatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlistedWatches.map((watch) => (
            <ProductTile key={watch.id} watch={watch} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p className="text-xl">Your wishlist is empty.</p>
          <p className="mt-2">
            Click the heart icon on products to add them here.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-md bg-blue-600 py-3 px-6 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Explore Watches
          </Link>
        </div>
      )}
    </div>
  );
}

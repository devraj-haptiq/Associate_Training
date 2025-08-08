import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductTile from "../components/ProductTile";

export default function SearchPage() {
  const { allWatches, isLoading, error } = useWishlist();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const searchResults = useMemo(() => {
    if (!query) {
      return [];
    }
    return allWatches.filter(
      (watch) =>
        watch.name.toLowerCase().includes(query.toLowerCase()) ||
        watch.brand.toLowerCase().includes(query.toLowerCase())
    );
  }, [allWatches, query]);

  if (isLoading) {
    return <div className="text-center py-10">Searching...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
        Search Results
      </h1>
      <p className="text-center text-gray-600 mb-8">
        {searchResults.length} results found for "{query}"
      </p>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {searchResults.map((watch) => (
            <ProductTile key={watch.id} watch={watch} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p className="text-xl">
            We couldn't find any watches matching your search.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-md bg-blue-600 py-3 px-6 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}

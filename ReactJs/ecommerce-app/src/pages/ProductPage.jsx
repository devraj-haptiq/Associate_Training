import React, { useState, useMemo, useEffect } from "react";

import ProductTile from "../components/ProductTile";

import mockWatchesData from "../data/watches.json";

const fetchWatchesFromAPI = () => {
  console.log("Fetching data from API...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWatchesData.watches);
    }, 1000);
  });
};

export default function ProductPage() {
  const [allWatches, setAllWatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterBrand, setFilterBrand] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const getWatches = async () => {
      try {
        const watchesData = await fetchWatchesFromAPI();
        setAllWatches(watchesData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch watches. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getWatches();
  }, []);

  const brands = ["all", ...new Set(allWatches.map((watch) => watch.brand))];

  const filteredAndSortedWatches = useMemo(() => {
    let result = [...allWatches];

    if (filterBrand !== "all") {
      result = result.filter((watch) => watch.brand === filterBrand);
    }
    if (inStockOnly) {
      result = result.filter((watch) => watch.in_stock);
    }
    switch (sortOrder) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return result;
  }, [allWatches, filterBrand, inStockOnly, sortOrder]);

  if (isLoading) {
    return <div className="text-center py-10">Loading watches...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
        Our Watches Collection
      </h1>

      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <div>
          <label
            htmlFor="brand-filter"
            className="mr-2 font-medium text-gray-700"
          >
            Brand:
          </label>
          <select
            id="brand-filter"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm p-2"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand === "all" ? "All Brands" : brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort-order"
            className="mr-2 font-medium text-gray-700"
          >
            Sort by:
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm p-2"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="stock-filter"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="stock-filter"
            className="ml-2 font-medium text-gray-700"
          >
            In Stock Only
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAndSortedWatches.length > 0 ? (
          filteredAndSortedWatches.map((watch) => (
            <ProductTile key={watch.id} watch={watch} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No watches match the current filters.
          </p>
        )}
      </div>
    </div>
  );
}

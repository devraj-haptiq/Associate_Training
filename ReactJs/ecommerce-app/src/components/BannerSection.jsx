import React from "react";
import { Link } from "react-router-dom";
const mansImage =
  "https://static-01.daraz.com.bd/p/3f6f548e25a32b0f86c59b3c7136c686.jpg";
const womensImage =
  "https://www.rado.com/media/sgecom_contentsystem/SEO_pages/Watches-for-Women/true-thinline-women-watches-hero-mobile.jpg";

export default function BannerSection() {
  return (
    <div>
      <div className="flex h-[100vh]">
        <Link
          to="/products"
          className="banner-section w-full md:w-1/2  flex items-center justify-center text-white no-underline"
          style={{
            backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${mansImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "centre",
          }}
        >
          <div className="banner-content text-center p-6">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
              For Him
            </h2>
            <p className="mt-2 mb-4 text-gray-200">
              Timeless Pieces for the Modern Man
            </p>
            <Link to={"/products"}>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 rounded-full">
                Shop Men's
              </button>
            </Link>
          </div>
        </Link>

        <Link
          to="/products"
          className="banner-section w-full md:w-1/2  flex items-center justify-center text-white no-underline"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${womensImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "centre",
          }}
        >
          <div className="banner-content text-center p-6">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
              For Her
            </h2>
            <p className="mt-2 mb-4 text-gray-200">
              Elegance and Style on Your Wrist
            </p>
            <Link to={"/products"}>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 rounded-full">
                Shop Women's
              </button>
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
}

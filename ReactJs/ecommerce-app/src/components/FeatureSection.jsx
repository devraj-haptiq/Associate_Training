import React from "react";
import { Link } from "react-router-dom";

const brands = [
  {
    name: "Rolex",
    logoSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7R52m163VDIM7ZTSpRQa8llvSh__Jwl3Z-Kw_g4PYzDi-2JDAj6SNtCl397WRi4X21Q&usqp=CAU",
  },
  {
    name: "Omega",
    logoSrc:
      "https://admin.abc.sm/upload/7729/catalogodinamico/categorie/cat_27049_1720491200px-Omega_Logo.svg.png",
  },
  {
    name: "Seiko",
    logoSrc: "https://1000logos.net/wp-content/uploads/2018/10/Seiko-Logo.png",
  },
  {
    name: "Patek Philippe",
    logoSrc:
      "https://b2756409.smushcdn.com/2756409/wp-content/uploads/2022/12/patek-philippe-watches-australia.png?lossy=1&strip=1&webp=1",
  },
  {
    name: "Timex",
    logoSrc:
      "https://logos-world.net/wp-content/uploads/2024/10/Timex-Logo.png",
  },
  {
    name: "Tissot",
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Tissot_Logo.svg/1280px-Tissot_Logo.svg.png ",
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Featured Brands
          </h2>
          <p className="text-gray-600 mt-2">
            Discover timepieces from the world's most renowned watchmakers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex justify-center items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <Link className="block">
                <img
                  src={brand.logoSrc}
                  alt={`${brand.name} logo`}
                  className="h-12 w-auto object-contain "
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function Header() {
  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white text-black p-4 sticky top-0 left-0 z-50 w-full shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link to="/" className="text-2xl">
            <img className="h-10" src="/logo.svg" alt="Logo" />
          </Link>
          <nav className="hidden md:flex justify-between gap-4 items-center text-lg">
            <Link to="/" className="hover:text-gray-600">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-600">
              Products
            </Link>
            <Link to="/wishlist" className="hover:text-gray-600">
              Wishlist
            </Link>
          </nav>
        </div>
        <div className="flex gap-5 items-center">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center"
          >
            <i className="fa-solid fa-magnifying-glass absolute left-3 text-gray-500 pointer-events-none"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by brand or name..."
              className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <div className="flex items-center justify-between gap-4 text-xl">
            <Link to="/cart" className="relative hover:text-gray-600">
              <i className="fa-solid fa-cart-shopping"></i>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="hover:text-gray-600">
                  <i className="fa-solid fa-user"></i>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold hover:text-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4 text-sm font-semibold">
                <Link to="/login" className="hover:text-gray-600">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-gray-600">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

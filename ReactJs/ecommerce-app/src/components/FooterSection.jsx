import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white ">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/logo.svg" className="bg-white p-1 mb-3"></img>
            <p className="text-gray-400">
              Your one-stop destination for the world's finest timepieces.
              Discover luxury, precision, and style.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-2">
              Subscribe to get the latest news and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md p-2 text-white"
              />
              <button className="bg-blue-700 text-white p-2 rounded-r-md hover:bg-gray-800">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center text-gray-500 border-t border-gray-700 mt-8 pt-6">
          <p>
            &copy; {new Date().getFullYear()} THE TIME HOUSE. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

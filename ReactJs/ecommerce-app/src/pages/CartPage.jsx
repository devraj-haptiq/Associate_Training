import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from "../redux/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, user } = useSelector((state) => ({
    cartItems: state.cart.items,
    user: state.auth.user,
  }));

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (user) {
      alert("Proceeding to checkout!");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-xl">Your cart is currently empty.</p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-md bg-blue-600 py-3 px-6 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Explore Our Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity({ id: item.id }))
                      }
                      className="px-3 py-1 font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="px-4 text-lg">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity({ id: item.id }))
                      }
                      className="px-3 py-1 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(removeItemFromCart({ id: item.id }))
                    }
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-4">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

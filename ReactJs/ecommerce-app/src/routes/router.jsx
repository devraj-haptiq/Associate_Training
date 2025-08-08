import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDescriptionPage from "../pages/ProductDescriptionPage";
import WishlistPage from "../pages/WishlistPage";
import CartPage from "../pages/CartPage";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/products/:productId", element: <ProductDescriptionPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "/profile", element: <ProfilePage /> }],
      },
    ],
  },
]);

export default Router;

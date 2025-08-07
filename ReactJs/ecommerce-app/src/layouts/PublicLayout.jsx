import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";
import { Toaster } from "react-hot-toast";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

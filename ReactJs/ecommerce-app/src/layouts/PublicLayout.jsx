import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";

export default function PublicLayout() {
  return (
    <>
      <Header />
      <div>{<Outlet />}</div>
      <Footer />
    </>
  );
}

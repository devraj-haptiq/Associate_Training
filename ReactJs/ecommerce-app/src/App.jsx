import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import PublicLayout from "./layouts/PublicLayout";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/router";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;

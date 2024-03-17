import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routers/routes.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);

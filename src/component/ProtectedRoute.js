import React from "react";
import { Navigate } from "react-router-dom";
import { useProductCart } from "./CartProvider";

const ProtectedRoute = ({ children }) => {
  let { user } = useProductCart();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
    const token = localStorage.getItem("access_token");
    return token ? <Component /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
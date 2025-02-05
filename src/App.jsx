import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPages/LoginPage";
import ForgetPasswordPage from "./pages/LoginPages/ForgetPasswordPage";
import ProtectedRoute from "./config/route/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import AddImages from "./pages/AddImages";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element= {<ForgetPasswordPage />} />
                <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />}/>
                <Route path="/gallery" element={<ProtectedRoute component={Gallery} />}/>
                <Route path="/add-images" element={<ProtectedRoute component={AddImages} />}/>
            </Routes>
        </Router>
    );
};

export default App

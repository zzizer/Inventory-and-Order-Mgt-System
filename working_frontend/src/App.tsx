import SigninPage from "./pages/auth_pages/Signin";
import SignupPage from "./pages/auth_pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { ToastProvider } from "./components/Toast";
import Products from "./pages/Products";

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/products'
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        
        {/* Fallback Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ToastProvider>
  );
};

const AppWithRouter: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
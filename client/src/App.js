import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';     // ✅ fixed import path
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

function App() {
  const getStoredCart = () => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(getStoredCart());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const isAdminAuthenticated = localStorage.getItem('admin-auth') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/menu"
          element={<MenuPage cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/cart"
          element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" />
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
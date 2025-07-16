import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center p-6 text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 Order Placed Successfully!</h2>
      <p className="text-gray-700 mb-2">
        Thank you for dining with Aniicone Café.
      </p>
      {order ? (
        <>
          <p className="mb-1">🧾 Order placed on: {new Date(order.timestamp).toLocaleString()}</p>
          <p className="mb-4 font-medium">Status: <span className="text-yellow-600">{order.status}</span></p>
        </>
      ) : (
        <p className="text-red-500 font-semibold mb-4">No order data found.</p>
      )}
      <Link
        to="/menu"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Browse More Items 🍽️
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
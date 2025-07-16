import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[₹]/g, '')) || 0;
    return acc + price;
  }, 0);

  const handleRemove = index => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white relative"
      style={{ backgroundImage: "url('/bak.jpg')" }}
    >
      {/* 🔲 Optional dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative z-10 px-8 py-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-100 drop-shadow">
          Your Cart 🛍️
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-yellow-200">No items added yet!</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item, i) => (
                <li
                  key={i}
                  className="bg-white/90 shadow rounded px-4 py-2 flex justify-between items-center text-gray-800"
                >
                  <span>{item.title}</span>
                  <div className="flex items-center gap-4">
                    <span>{item.price}</span>
                    <button
                      onClick={() => handleRemove(i)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove ❌
                    </button>
                  </div>
                </li>
              ))}
              <li className="bg-green-100 rounded px-4 py-2 flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>₹{total}</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleClearCart}
                className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-md text-gray-900"
              >
                Clear Cart 🧹
              </button>

              <button
                onClick={() => navigate('/checkout')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
              >
                Proceed to Checkout 💳
              </button>

              <button
                onClick={() => navigate(-1)}
                className="text-yellow-100 hover:text-white flex items-center gap-2"
              >
                <span className="text-xl">←</span> Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
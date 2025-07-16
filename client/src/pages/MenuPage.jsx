import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    title: "Espresso",
    price: "₹150",
    image: "/drink.jpg",
    category: "Drinks",
  },
  {
    title: "Burger",
    price: "₹200",
    image: "/Burger.jpg",
    category: "Dishes",
  },
  {
    title: "Chocolate Cake",
    price: "₹180",
    image: "/dessert.jpg",
    category: "Desserts",
  },
];

const MenuPage = ({ cartItems, setCartItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = item => {
    setCartItems(prev => [...prev, item]);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white relative"
      style={{ backgroundImage: "url('/bak.jpg')" }}
    >
      {/* 🌓 Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* 🌟 Main content */}
      <div className="relative z-10 px-8 py-6">
        <h1 className="text-4xl font-bold text-center text-yellow-200 mb-4 drop-shadow">
          Aniicone Café Menu
        </h1>

        {/* 🛒 Cart Info */}
        <p className="text-right text-sm text-yellow-100 mb-2">
          Cart: {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </p>

        {/* 🚀 View Cart Button */}
        <button
          onClick={() => navigate('/cart')}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Cart 🛍️
        </button>

        {/* 🗂️ Category Tabs */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {['All', 'Drinks', 'Dishes', 'Desserts'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md font-medium shadow transition ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-yellow-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 🍔 Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-500">{item.category}</p>
                <div className="mt-2 text-green-600 font-bold">{item.price}</div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Add to Cart 🛍️
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="mt-4 text-gray-700 hover:text-black flex items-center gap-2"
                >
                  <span className="text-xl">←</span> Back
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
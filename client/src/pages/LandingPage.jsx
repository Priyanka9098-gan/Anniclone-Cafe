import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white font-sans relative"
      style={{ backgroundImage: "url('/ambience.jpg')" }}
    >
      {/* 🔲 Overlay for text clarity */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10">
        <header className="text-center py-10">
          <img src="/logo.jpg" alt="Aniicone Café" className="mx-auto w-24 rounded-full shadow-lg" />
          <h1 className="text-4xl font-bold mt-4 drop-shadow">Welcome to Aniicone’s Café</h1>
          <p className="mt-2 text-lg drop-shadow">
            Sip. Snack. Smile. Your digital café experience begins here.
          </p>

          {/* 🍽️ Navigation Buttons */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition"
            >
              View Menu 🍽️
            </button>

            <button
              onClick={() => navigate('/admin-login')}
              className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-800 transition"
            >
              Admin Login 🔐
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-200">For café managers only</p>
        </header>

        {/* 🍰 Featured Images Gallery with Menu Button */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 py-6">
          {/* <img src="/shake.jpg" alt="Coffee" className="rounded-lg shadow-md" />
          <img src="/shake2.jpg" alt="Dessert" className="rounded-lg shadow-md" /> */}
          <img src="/ambience.jpg" alt="Ambience" className="rounded-lg shadow-md" />

          {/* 📋 Menu Image */}
          <div className="flex flex-col items-center">
            <img src="/menuu.jpg" alt="Full Café Menu" className="rounded-lg shadow-md mb-4" />

            {/* 🧭 Button below menu.jpg */}
            <button
              onClick={() => navigate('/menu')}
              className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition"
            >
              View Menu 🍽️
            </button>
          </div>
{/* 
          <img src="/Burger.jpg" alt="Burger Dish" className="rounded-lg shadow-md" />
          <img src="/drink.jpg" alt="Drink Selection" className="rounded-lg shadow-md" /> */}
        </section>

        <footer className="text-center py-6 text-sm text-gray-300">
          © 2025 Aniicone’s Café. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
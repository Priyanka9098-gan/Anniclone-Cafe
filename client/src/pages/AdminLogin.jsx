import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('admin-auth', 'true');
      navigate('/admin');
    } else {
      alert('Invalid password!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 underline text-sm"
      >
        ← Back to Home
      </button>

      <div className="bg-white shadow rounded p-6 w-80">
        <h2 className="text-xl font-bold text-center mb-4">Admin Login 🔐</h2>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
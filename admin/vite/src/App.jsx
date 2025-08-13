import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import Earnings from './pages/Earnings'; // ✅ Import your Earnings page

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar setToken={setToken} />
      <hr />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Order token={token} />} />
            <Route path="/earnings" element={<Earnings />} /> {/* ✅ Added */}
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;

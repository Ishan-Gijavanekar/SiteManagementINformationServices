import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Stores/authStore';

const HomePageProcurment = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-300">
        <div className="flex items-center">
          <img src="BusinessCardLogo.jpg" alt="Logo" className="h-8 mr-4" />
          <span className="font-bold text-lg">Procurment</span>
        </div>
        <div className="text-center font-bold text-blue-700 flex-grow">
          SiteMIS version 11.0
        </div>
        <div className="hidden md:flex space-x-4">
          <button onClick={() => navigate('/home')} className="p-2 bg-blue-600 text-white rounded">Home</button>
          <button onClick={handleLogout} className="p-2 bg-red-600 text-white rounded">Logout</button>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-300 p-4 space-y-4">
          <button onClick={() => navigate('/home')} className="block w-full p-2 bg-blue-600 text-white rounded">Home</button>
          <button onClick={handleLogout} className="block w-full p-2 bg-red-600 text-white rounded">Logout</button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Master</h2>
          <p>Content for Master column</p>
        </div>
        <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Transaction</h2>
          <p>Content for Transaction column</p>
        </div>
        <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Reports</h2>
          <p>Content for Reports column</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-300 text-center">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default HomePageProcurment;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Stores/authStore';

const departments = [
  { name: 'Accounts', image: 'Accounts.webp', link: "accounts" },
  { name: 'Technical', image: 'Technical.jpg', link: "technical" },
  { name: 'Procurement', image: 'Procurment.avif', link: "procurment" },
  { name: 'Stores', image: 'Stores.webp', link: "stores" },
  { name: 'Vehicle and Machinery Maintenance', image: 'VMM.jpg', link: "vmm" },
  { name: 'Human Resource', image: 'hr.jpg', link: "hr" },
  { name: 'Administration', image: 'admin.png', link: "administration" },
];

const HomePage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <div className="logo">
          <img src="Logo2-transformed.jpeg" alt="Logo" className="h-8" />
        </div>
        <div className="version text-center flex-1 font-bold text-blue-700">SiteMIS version 11.0</div>
        <div className="flex items-center">
          <button onClick={handleLogout} className="mr-4 p-2 bg-blue-600 text-white rounded hover:bg-red-700">Logout</button>
          <img src="User.jpg" alt="User Profile" className="h-8 w-8 rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-wrap p-4 justify-center">
        {departments.map((department, index) => (
          <Link key={index} to={`/${department.link}`} className="m-4 p-4 w-full md:w-1/3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex flex-col items-center transform hover:scale-105 transition-transform">
            <img src={department.image} alt={`${department.name} image`} className="h-30 w-65 mb-4" />
            <h3 className="text-lg font-semibold">{department.name}</h3>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 text-center">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { Menu, Trash, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Stores/authStore';

const UserRegistration = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { register, getUsers, deleteUser, users, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password
    };
    await register(userData);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-300">
        <div className="flex items-center">
          <img src="/BusinessCardLogo.jpg" alt="Logo" className="h-8 mr-4" />
          <span className="font-bold text-lg">Admin</span>
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
        {/* Registration Form */}
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-4">User Registration</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block mb-1" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
          </form>
          <h2 className="font-bold mb-2 mt-8">User Rights</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <button
                onClick={() => navigate('/user-administration')}
                className="text-blue-600 hover:underline transition-all duration-200 ease-in-out transform hover:scale-105 hover:text-blue-800"
              >
                User Administration Rights
              </button>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <button
                onClick={() => navigate('/administration/companyRights')}
                className="text-blue-600 hover:underline transition-all duration-200 ease-in-out transform hover:scale-105 hover:text-blue-800"
              >
                User Rights for Company
              </button>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <button
                onClick={() => navigate('/administration/projectRights')}
                className="text-blue-600 hover:underline transition-all duration-200 ease-in-out transform hover:scale-105 hover:text-blue-800"
              >
                User Rights for Project
              </button>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <button
                onClick={() => navigate('/transaction-rights')}
                className="text-blue-600 hover:underline transition-all duration-200 ease-in-out transform hover:scale-105 hover:text-blue-800"
              >
                User Rights for Transaction
              </button>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <button
                onClick={() => navigate('/administration/formRights')}
                className="text-blue-600 hover:underline transition-all duration-200 ease-in-out transform hover:scale-105 hover:text-blue-800"
              >
                User Rights for Forms
              </button>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded h-150 overflow-y-scroll">
          <h2 className="font-bold mb-4">Registered Users</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search for users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="w-full p-2 mb-4 bg-blue-600 text-white rounded">Search</button>
          <div className="space-y-4">
            {users
              .filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((user, index) => (
                <div key={index} className="p-4 bg-white border border-gray-300 rounded flex justify-between items-center">
                  {user.username}
                  <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                    <Trash className='size-5 cursor-pointer' />
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-300 text-center">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default UserRegistration;

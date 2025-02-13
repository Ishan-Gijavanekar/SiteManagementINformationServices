import React, { useEffect, useState } from 'react';
import { Menu, Trash, X, Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Stores/authStore';

const CompanyRights = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const { getUsers, users, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState('');

  const handleCompanySelect = (e) => {
    setSelectedCompany(e.target.value);
  };

  const companies = []

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
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
        <div className="w-full flex flex-col space-y-4">
          {/* User Dropdown */}
          <div className="mb-4">
            <label htmlFor="userSelect" className="block mb-1 font-bold">Select User</label>
            <select
              id="userSelect"
              value={selectedUser}
              onChange={handleUserSelect}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.username}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-1 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Company Table */}
            <div className="w-full md:w-2/3 p-4 bg-gray-100 rounded shadow">
              <div className="mb-4">
                <label htmlFor="search" className="block mb-1 font-bold">Search Companies</label>
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Search by company name..."
                />
              </div>
              <table className="min-w-full bg-white border border-gray-200 rounded">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="p-2 border-r">Action</th>
                    <th className="p-2 border-r">Company ID</th>
                    <th className="p-2">Company Name</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.filter(company => company.name.includes(searchQuery)).map((company) => (
                    <tr key={company._id}>
                      <td className="p-2 border-r">
                        <button className="p-1 bg-yellow-500 text-white rounded mr-2">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 bg-red-500 text-white rounded">
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="p-2 border-r">{company._id}</td>
                      <td className="p-2">{company.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Company Button */}
            <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded shadow flex flex-col justify-center items-center space-y-4">
                <label htmlFor="companySelect" className="block mb-1 font-bold">Companies</label>
                <select
                    id="companySelect"
                    value={selectedCompany}
                    onChange={handleCompanySelect}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                <option value="">Select a company</option>
                {companies.map((company) => (
                    <option key={company._id} value={company._id}>{company.name}</option>
                ))}
                </select>
                <div className="flex space-x-2">
                    <button className="p-2 bg-green-500 text-white rounded-full">
                        <Plus className="h-6 w-6" />
                    </button>
                    <button className="p-2 bg-yellow-500 text-white rounded-full">
                        <Edit className="h-6 w-6" />
                    </button>
                <button className="p-2 bg-red-500 text-white rounded-full">
                    <Trash className="h-6 w-6" />
                </button>
            </div>
            
            </div>

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

export default CompanyRights;

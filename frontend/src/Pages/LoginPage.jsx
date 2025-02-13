import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Stores/authStore.js';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let newCaptcha = '';
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(newCaptcha);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      alert('Invalid Captcha');
      return;
    }

    try {
      const res = await login({ username, password });
      if (res && res.data && res.data.user) {
        navigate('/home');
       }// else {
      //   toast.error(res.data.message || 'Invalid credentials');
      // }
    } catch (error) {
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-300">
        <div className="logo">
          <img src="BusinessCardLogo.jpg" alt="Logo" className="h-8" />
        </div>
        <div className="version text-right font-bold text-blue-700">
          SiteMIS version 11.0
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row p-4">
        {/* Left Column */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="w-[75%] p-2 border border-gray-300 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="password">Password</label>
              <div className="flex items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-[75%] p-2 border border-gray-300 rounded pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none ml-2">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="captcha">Captcha</label>
              <div className="flex items-center">
                <div className="captcha-code bg-gray-200 p-2 border border-gray-300 rounded">{captcha}</div>
                <button type="button" onClick={generateCaptcha} className="ml-2 p-2 bg-gray-200 border border-gray-300 rounded">Reload</button>
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                id="captcha"
                className="w-[75%] mt-2 p-2 border border-gray-300 rounded"
                placeholder="Enter Captcha"
              />
            </div>
            <button type="submit" className="w-[75%] p-2 bg-blue-600 text-white rounded">Login</button>
          </form>
        </div>

        {/* Right Column */}
        <div className="w-[75%] md:w-1/2 flex items-center justify-center">
          <div className="logo p-4">
            <img src="Logo2-transformed.jpeg" alt="Logo" className="h-32 mx-auto" />
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

export default LoginPage;

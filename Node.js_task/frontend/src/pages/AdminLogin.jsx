import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleType, setRoleType] = useState('seller'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = roleType === 'admin' ? '/admin/login' : '/seller/login';
      const res = await API.post(endpoint, { email, password });
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        
        if (res.data.role === 'admin') {
          navigate('/sellers');
        } else {
          navigate('/products');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'failed to login!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-900 via-purple-900 to-purple-700">
      <div className="bg-[#1e152a] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20 text-center">
        <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-4 overflow-hidden border-2 border-purple-400 flex items-center justify-center">
          <span className="text-3xl">👤</span>
        </div>
    <h2 className="text-3xl font-bold text-white mb-6">Login</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
       <label className="text-white flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="role" checked={roleType === 'seller'} onChange={() => setRoleType('seller')} />
              <span>Seller</span>
            </label>
            <label className="text-white flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="role" checked={roleType === 'admin'} onChange={() => setRoleType('admin')} />
              <span>Admin</span>
            </label>
          </div>

          <input
            type="email"
            placeholder="Email"
        className="w-full p-3 rounded-lg bg-[#2d223c] text-white border border-purple-500/30 focus:outline-none focus:border-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-[#2d223c] text-white border border-purple-500/30 focus:outline-none focus:border-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
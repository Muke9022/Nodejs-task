import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AddSeller = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobileNo: '', country: '', state: '', skills: '', password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()) 
      };
      await API.post('/admin/create-seller', payload);
      navigate('/sellers');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating seller');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Seller Account</h2>
        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input type="text" placeholder="Mobile Number" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, mobileNo: e.target.value})} required />
        <input type="text" placeholder="Country" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, country: e.target.value})} required />
        <input type="text" placeholder="State" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, state: e.target.value})} required />
        <input type="text" placeholder="Skills (Comma separated: React, Node)" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, skills: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, password: e.target.value})} required />
        <button type="submit" className="w-full bg-[#00796b] text-white p-3 rounded-lg font-semibold hover:bg-[#004d40]">Save Seller</button>
      </form>
    </div>
  );
};

export default AddSeller;
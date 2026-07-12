import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await API.get('/admin/sellers');
        setSellers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSellers();
  }, []);

  return (
    <div className="flex bg-[#f4f6f9] min-h-screen">
    
      <div className="w-64 bg-[#1f1135] text-white p-4">
          <div className="text-2xl font-bold text-purple-400 mb-10 pl-4">LOGO</div>
        <nav className="space-y-2">
          <Link to="/sellers" className="flex items-center space-x-3 p-3 rounded-lg bg-[#3b2263]">
            <span>🌐</span> <span>Users</span>
          </Link>
        </nav>
      </div>

      <div className="flex-1">
        <div className="bg-white p-4 shadow-sm flex justify-between items-center px-8">
          <div className="text-xl font-semibold text-gray-700">List</div>
          <button onClick={() => { localStorage.clear(); navigate('/'); }} className="text-red-500 text-sm font-semibold">Logout</button>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Sellers</h3>
              <button onClick={() => navigate('/add-seller')} className="bg-[#00796b] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#004d40]">
                Add Seller
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-400 text-sm">
                  <th className="pb-3">#</th>
                  <th className="pb-3">NAME</th>
                  <th className="pb-3">EMAIL</th>
                  <th className="pb-3">PHONE NO</th>
                  <th className="pb-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {sellers.map((s, i) => (
                  <tr key={s._id} className="border-b hover:bg-gray-50">
                    <td className="py-4">{i + 1}</td>
                    <td className="py-4">{s.name}</td>
                    <td className="py-4">{s.email}</td>
                    <td className="py-4">{s.mobileNo}</td>
                    <td className="py-4 text-red-500 cursor-pointer">🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerList;
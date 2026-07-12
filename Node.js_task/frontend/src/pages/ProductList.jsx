import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const ProductList = () => {
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await API.get(`/products?page=${page}&limit=5`);

      setProducts(res.data.data);
      setTotalPages(res.data.pages);

    } catch (err) {
      console.error(err);
    }
  };

  fetchProducts();
}, [page]);

  const handleViewPDF = async (id) => {
  try {
    const response = await API.get(`/products/${id}/pdf`, {
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL, "_blank");
  } catch (error) {
    console.error(error);
   alert("Unable to open PDF.");
  }
};
const handleDelete = async (id) => {
  try {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);

      setProducts((prevProducts) =>
  prevProducts.filter((p) => p._id !== id)
);
    }
  } catch (error) {
    console.error(error);
    alert("Unable to delete product.");
  }
};

  return (
    <div className="flex bg-[#f4f6f9] min-h-screen">
      <div className="w-64 bg-[#1f1135] text-white p-4">
        <div className="text-2xl font-bold text-purple-400 mb-10 pl-4">LOGO</div>
        <nav className="space-y-2">
          <Link to="/products" className="flex items-center space-x-3 p-3 rounded-lg bg-[#3b2263]">
            <span>📦</span> <span>Product</span>
          </Link>
        </nav>
      </div>

      <div className="flex-1">
        <div className="bg-white p-4 shadow-sm flex justify-between items-center px-8">
          <div className="text-xl font-semibold text-gray-700">Product</div>
          <button onClick={() => { localStorage.clear(); navigate('/'); }} className="text-red-500 text-sm font-semibold">Logout</button>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Product List</h3>
              <button onClick={() => navigate('/add-product')} className="bg-[#00796b] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#004d40]">
                Add Product
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-400 text-sm">
                  <th className="pb-3">#</th>
                  <th className="pb-3">PRODUCT NAME</th>
                  <th className="pb-3">DESCRIPTION</th>
                  <th className="pb-3">PRICE</th>
                  <th className="pb-3">ACTION</th>
                </tr>
              </thead>

              <tbody className="text-gray-600 text-sm">
                {products.map((p, index) => {
                  const totalPrice = p.brands?.reduce((acc, b) => acc + b.price, 0) || 0;
                  return (
                    <tr key={p._id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                     {(page - 1) * 5 + index + 1}
                      </td>
                      <td className="py-4 font-semibold">{p.productName}</td>
                      <td className="py-4">{p.productDescription}</td>
                      <td className="py-4">Rs.{totalPrice}/-</td>
                      <td className="py-4 space-x-2">
                        <button
                      onClick={() => handleViewPDF(p._id)}
                       className="bg-[#1a1438] text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-purple-950"
            >
  View PDF
</button>
                        <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end items-center mt-6 gap-3">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className={`px-4 py-2 rounded ${
      page === 1
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-[#00796b] text-white"
    }`}
  >
    Prev
  </button>

  <span className="font-semibold">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className={`px-4 py-2 rounded ${
      page === totalPages
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-[#00796b] text-white"
    }`}
  >
    Next
  </button>

</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
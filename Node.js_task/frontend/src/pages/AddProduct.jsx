import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
const [brands, setBrands] = useState([
  {
    brandName: "",
    detail: "",
    price: "",
    image: null,
  },
]);    
  
  const navigate = useNavigate();

 const handleAddBrandField = () => {
  setBrands([
    ...brands,
    {
      brandName: "",
      detail: "",
      price: "",
      image: null,
    },
  ]);
};

  const handleBrandChange = (index, field, value) => {
    const updatedBrands = [...brands];
    updatedBrands[index][field] = field === 'price' ? Number(value) : value;
    setBrands(updatedBrands);
  };
  const handleBrandImage = (index, file) => {
  const updatedBrands = [...brands];
  updatedBrands[index].image = file;
  setBrands(updatedBrands);
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("productDescription", productDescription);

    const brandData = brands.map((brand) => ({
      brandName: brand.brandName,
      detail: brand.detail,
      price: brand.price,
    }));

    formData.append("brands", JSON.stringify(brandData));

    brands.forEach((brand) => {
      formData.append("brandImages", brand.image);
    });

    await API.post("/products", formData);

    navigate("/products");

  } catch (err) {
    console.log(err.response?.data);
    console.log(err);
    alert(err.response?.data?.message || "Error creating product");
  }
};

  return (
    <div className="min-h-screen bg-[#f4f6f9] p-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        <input type="text" placeholder="Product Name (e.g., Mouse)" className="w-full p-3 border rounded-lg" value={productName} onChange={e => setProductName(e.target.value)} required />
        <textarea placeholder="Product Description" className="w-full p-3 border rounded-lg" value={productDescription} onChange={e => setProductDescription(e.target.value)} required />

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-700">Brands Details</h4>
            <button type="button" onClick={handleAddBrandField} className="text-sm bg-blue-600 text-white px-2 py-1 rounded">+ Add More Brand</button>
          </div>

          {brands.map((brand, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 border p-3 rounded-lg mb-2 bg-gray-50">
              <input type="text" placeholder="Brand Name (Dell)" className="p-2 border rounded" onChange={e => handleBrandChange(index, 'brandName', e.target.value)} required />
              <input type="text" placeholder="Detail" className="p-2 border rounded" onChange={e => handleBrandChange(index, 'detail', e.target.value)} required />
              <input type="number" placeholder="Price" className="p-2 border rounded" onChange={e => handleBrandChange(index, 'price', e.target.value)} required />
              <input
  type="file"
  accept="image/*"
  required
  onChange={(e) => handleBrandImage(index, e.target.files[0])}
/>
            </div>
          ))}
        </div>

<button type="submit"  className="w-full bg-[#00796b] text-white p-3 rounded-lg font-semibold hover:bg-[#004d40]">Save Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
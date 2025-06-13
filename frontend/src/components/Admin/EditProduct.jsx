import React, { useState } from 'react'

const EditProduct = () => {
  const [productsData, setProductsData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductsData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>Product Name</label>
          <input
            type='text'
            name="name"
            value={productsData.name}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2'
            required
          />
        </div>

        {/* Description */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>Description</label>
          <textarea
            name='description'
            value={productsData.description}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2'
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>Price</label>
          <input
            type='number'
            name='price'
            value={productsData.price}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        {/* Count in stock */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>Count in Stock</label>
          <input
            type='number'
            name='countInStock'
            value={productsData.countInStock}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        {/* SKU */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>SKU</label>
          <input
            type='text'
            name='sku'
            value={productsData.sku}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        {/* Sizes */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
          <input
            type='text'
            name='sizes'
            value={productsData.sizes.join(", ")}
            onChange={(e) =>
              setProductsData({
                ...productsData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        {/* Colors */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
          <input
            type='text'
            name='colors'
            value={productsData.colors.join(", ")}
            onChange={(e) =>
              setProductsData({
                ...productsData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        {/* Image Upload */}
        <div className='mb-6'>
          <label className='block font-semibold mb-2'>Upload Image</label>
          <input type='file' onChange={handleImageUpload} />
          <div className='flex gap-4 mt-4'>
            {productsData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.alttext || "Product Image"}
                  className='w-20 h-20 object-cover rounded-md shadow-md'
                />
              </div>
            ))}
          </div>
        </div>
        <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors'>Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

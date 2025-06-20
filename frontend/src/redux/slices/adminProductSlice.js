import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const getToken = () => `Bearer ${localStorage.getItem("userToken")}`;

// Fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: { Authorization: getToken() },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch products" });
    }
  }
);

// Create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/admin/products`, productData, {
        headers: { Authorization: getToken() },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to create product" });
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        {
          headers: { Authorization: getToken() },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update product" });
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: { Authorization: getToken() },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to delete product" });
    }
  }
);

// Slice
const adminProductSlice = createSlice({
  name: "adminproducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error fetching products";
      })

      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload?.message || "Error creating product";
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload?.message || "Error updating product";
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload?.message || "Error deleting product";
      });
  },
});

export default adminProductSlice.reducer;

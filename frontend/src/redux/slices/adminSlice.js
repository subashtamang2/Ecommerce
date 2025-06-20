import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to fetch users" });
  }
});

// Add user
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to add user" });
  }
});

// Update user
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update user" });
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to delete user" });
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch users";
      })

      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); // Adjust if payload contains `user`
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add user";
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update user";
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete user";
      });
  },
});

export default adminSlice.reducer;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Layouts
import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/Admin/AdminLayout';

// User Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectonPage from './pages/CollectonPage';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';


// Admin Pages
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProduct from './components/Admin/EditProduct';
import OrderManagement from './components/Admin/OrderManagement';
// import OrderManagement from './components/Admin/Ordermanagement';

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from './components/Common/ProtectedRoute';
import MyOrdersPage from './pages/MyOrdersPage';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>

          {/* User layout routes */}
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='collections/:collection' element={<CollectonPage />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='order-confirmation' element={<OrderConfirmationPage />} />
            <Route path='order/:id' element={<OrderDetailsPage />} />
            <Route path='my-orders' element={<MyOrdersPage />} />
          </Route>

          {/* Admin layout with nested routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route
              index
              element={
                <ProtectedRoute role="admin">
                  <AdminHomePage />
                </ProtectedRoute>
              }
            />

            <Route path='users' element={<UserManagement />} />
            <Route path='products' element={<ProductManagement />} />
            <Route path='products/:id/edit' element={<EditProduct />} />
            <Route path='orders' element={<OrderManagement />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

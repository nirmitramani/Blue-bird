import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

// global imports
import Navbar from './components/Web/global/Navbar';
import Footer from './components/Web/global/Footer';

// Website page imports
import Hero from './components/Web/home/Hero';
import AboutUs from './components/Web/pages/AboutUs';
import ContactUs from './components/Web/pages/ContactUs';
import Services from './components/Web/services/Services';
import Products from './components/Web/shop/Products';
import ProductDetail from './components/Web/shop/ProductDetail';

// Login Register imports
import SignIn from './components/Web/auth/SignIn';
import SignUp from './components/Web/auth/SignUp';

// Auth imports
import { Auth, AuthGuard } from './components/Auth';

// Admin imports
import AdminHero from './components/Admin/home/AdminHero';

// Toasts imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Profile Page imports
import Orders from './components/Web/profile/Orders';
import AccountDetails from './components/Web/profile/AccountDetails';
import Dashboard from './components/Web/profile/Dashboard';
import ChangePassword from './components/Web/profile/ChangePassword';
import CartItems from './components/Web/pages/CartItems';
import FavoriteProducts from './components/Web/pages/FavoriteProducts';
import Sale from './components/Web/pages/Sale';

// Backend route url
window.react_app_url = 'http://localhost:3000/';

const App = () => {
  const location = useLocation();

  const dontShowNavbarPaths = ['/sign-up', 'register', '/sign-in', '/admin'];
  const shouldShowNavbar = !dontShowNavbarPaths.includes(location.pathname);
  const inAdminPanel = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ToastContainer />
      {inAdminPanel && <AdminHero />}
      {shouldShowNavbar && !inAdminPanel && <Navbar />}
      <Routes>
        <Route index element={<Hero />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<CartItems />} />
        <Route path="sale" element={<Sale />} />
        <Route path="favorite" element={<FavoriteProducts />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
        <Route path="profile/dashboard/:id" element={<Auth element={<Dashboard />} role='user' />} />
        <Route path="profile/orders/:id" element={<Auth element={<Orders />} role='user' />} />
        <Route path="profile/change-password/:id" element={<Auth element={<ChangePassword />} role='user' />} />
        <Route path="profile/account-details/:id" element={<Auth element={<AccountDetails />} role='user' />} />
        <Route path="sign-in" element={<AuthGuard element={<SignIn />} role='user' />} />
        <Route path="sign-up" element={<AuthGuard element={<SignUp />} role='user' />} />
      </Routes>
      {shouldShowNavbar && !inAdminPanel && <Footer />}
    </>
  );
};

export default App;

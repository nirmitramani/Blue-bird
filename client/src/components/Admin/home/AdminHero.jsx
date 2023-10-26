import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';
import Dashboard from './Dashboard';
import Profile from './Profile';

import Slider from '../modules/sliders/Slider';
import AddUpdateSlider from '../modules/sliders/AddUpdateSlider';
import ViewSlider from '../modules/sliders/ViewSlider';

import FAQs from '../modules/FAQs/FAQs';
import ViewFAQs from '../modules/FAQs/ViewFAQs';
import AddUpdateFAQs from '../modules/FAQs/AddUpdateFAQs';

import ContactUs from '../modules/contact-us/ContactUs';
import ViewContactUs from '../modules/contact-us/ViewContactUs';

import Products from '../modules/products/Products';
import AddUpdateProduct from '../modules/products/AddUpdateProduct';
import ViewProduct from '../modules/products/ViewProduct';

import Event from '../modules/events/Event';
import AddUpdateEvent from '../modules/events/AddUpdateEvent';
import ViewEvent from '../modules/events/ViewEvent';

import Categories from '../modules/product-categories/Categories';
import AddUpdateCategory from '../modules/product-categories/AddUpdateCategory';
import ViewCategory from '../modules/product-categories/ViewCategory';

import ProductStockAndSize from '../modules/product-stock-size/ProductStockAndSize';
import AddUpdateProductStockAndSize from '../modules/product-stock-size/AddUpdateProductStockAndSize';
import ViewProductStockAndSize from '../modules/product-stock-size/ViewProductStockAndSize';

import CmsPages from '../modules/cms-pages/CmsPages'
import UpdateCmsPage from '../modules/cms-pages/UpdateCmsPage'
import ViewCmsPage from '../modules/cms-pages/ViewCmsPage'

import Users from '../modules/users/Users';
import AddUpdateUser from '../modules/users/AddUpdateUser';
import ViewUser from '../modules/users/ViewUser';

import Order from '../modules/orders/Orders';
import ViewOrder from '../modules/orders/ViewOrder';

import CouponCode from '../modules/coupon-code/CouponCode';
import ViewCouponCode from '../modules/coupon-code/ViewCouponCode';
import AddUpdateCouponCode from '../modules/coupon-code/AddUpdateCouponCode';
import SignIn from '../../../components/Web/auth/SignIn';
import { Auth, AuthGuard } from '../../Auth';

window.contact_url = 'contact-us';
window.cms_page_url = 'cms-pages';
window.event_url = 'event';
window.faq_url = 'faqs';
window.product_category_url = 'productCategory';
window.product_url = 'product';
window.slider_url = 'slider';
window.user_url = 'user';
window.order_url = 'order';
window.order_item_url = 'order-item';
window.payment_detail_url = 'payment-detail';
window.coupon_code_url = 'coupon-code';
window.product_stock_size = 'product-stock-size';

const AdminHero = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const isSignInPage = location.pathname === '/admin/sign-in';

  return (
    <>
      <div className="flex">
        {isSignInPage ? null : <Sidebar open={open} setOpen={setOpen} />}
        <div className={`${open ? "ml-[285px]" : "ml-[70px]"} flex-1 p-7 ${isSignInPage ? "bg-white" : "bg-[#f1f5f9]"} transition-spacing duration-500`}>
          {isSignInPage ? null : <Topbar open={open} setOpen={setOpen} />}
          <Routes>
            <Route path="admin/sign-in" element={<AuthGuard element={<SignIn />} role='admin' />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="admin/dashboard" element={AuthElement('admin', <Dashboard />)} />
            <Route path="admin/profile" element={AuthElement('admin', <Profile />)} />

            //Users route
            <Route path="admin/users" element={AuthElement('admin', <Users />)} />
            <Route path="/admin/users/add" element={AuthElement('admin', <AddUpdateUser />)} />
            <Route path="/admin/users/update/:id" element={AuthElement('admin', <AddUpdateUser />)} />
            <Route path="/admin/users/view/:id" element={AuthElement('admin', <ViewUser />)} />

            //Slider routes
            <Route path="admin/sliders" element={AuthElement('admin', <Slider />)} />
            <Route path="/admin/sliders/add" element={AuthElement('admin', <AddUpdateSlider />)} />
            <Route path="/admin/sliders/update/:id" element={AuthElement('admin', <AddUpdateSlider />)} />
            <Route path="/admin/sliders/view/:id" element={AuthElement('admin', <ViewSlider />)} />

            //Products route
            <Route path="admin/products" element={AuthElement('admin', <Products />)} />
            <Route path="/admin/products/add" element={AuthElement('admin', <AddUpdateProduct />)} />
            <Route path="/admin/products/update/:id" element={AuthElement('admin', <AddUpdateProduct />)} />
            <Route path="/admin/products/view/:id" element={AuthElement('admin', <ViewProduct />)} />

            //Events route
            <Route path="admin/events" element={AuthElement('admin', <Event />)} />
            <Route path="/admin/events/add" element={AuthElement('admin', <AddUpdateEvent />)} />
            <Route path="/admin/events/update/:id" element={AuthElement('admin', <AddUpdateEvent />)} />
            <Route path="/admin/events/view/:id" element={AuthElement('admin', <ViewEvent />)} />

            //Product Categories route
            <Route path="admin/product-categories" element={AuthElement('admin', <Categories />)} />
            <Route path="/admin/product-categories/add" element={AuthElement('admin', <AddUpdateCategory />)} />
            <Route path="/admin/product-categories/update/:id" element={AuthElement('admin', <AddUpdateCategory />)} />
            <Route path="/admin/product-categories/view/:id" element={AuthElement('admin', <ViewCategory />)} />
            
            //Product Categories route
            <Route path="admin/product-stock-size" element={AuthElement('admin', <ProductStockAndSize />)} />
            <Route path="/admin/product-stock-size/add" element={AuthElement('admin', <AddUpdateProductStockAndSize />)} />
            <Route path="/admin/product-stock-size/update/:id" element={AuthElement('admin', <AddUpdateProductStockAndSize />)} />
            <Route path="/admin/product-stock-size/view/:id" element={AuthElement('admin', <ViewProductStockAndSize />)} />

            //FAQs routes
            <Route path="admin/faqs" element={AuthElement('admin', <FAQs />)} />
            <Route path="/admin/faqs/add" element={AuthElement('admin', <AddUpdateFAQs />)} />
            <Route path="/admin/faqs/update/:id" element={AuthElement('admin', <AddUpdateFAQs />)} />
            <Route path="/admin/faqs/view/:id" element={AuthElement('admin', <ViewFAQs />)} />

            //Coupon Code routes
            <Route path="admin/coupon-code" element={AuthElement('admin', <CouponCode />)} />
            <Route path="/admin/coupon-code/add" element={AuthElement('admin', <AddUpdateCouponCode />)} />
            <Route path="/admin/coupon-code/update/:id" element={AuthElement('admin', <AddUpdateCouponCode />)} />
            <Route path="/admin/coupon-code/view/:id" element={AuthElement('admin', <ViewCouponCode />)} />

            //Contacts routes
            <Route path="admin/contact-us" element={AuthElement('admin', <ContactUs />)} />
            <Route path="/admin/contact-us/view/:id" element={AuthElement('admin', <ViewContactUs />)} />

            //Order routes
            <Route path="admin/order" element={AuthElement('admin', <Order />)} />
            <Route path="/admin/order/view/:id" element={AuthElement('admin', <ViewOrder />)} />

            //CMS routes
            <Route path="admin/cms-pages" element={AuthElement('admin', <CmsPages />)} />
            <Route path="admin/cms-pages/update/:id" element={AuthElement('admin', <UpdateCmsPage />)} />
            <Route path="admin/cms-pages/view/:id" element={AuthElement('admin', <ViewCmsPage />)} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const AuthElement = (role, element) => (
  <Auth element={element} role={role} />
);

export default AdminHero;

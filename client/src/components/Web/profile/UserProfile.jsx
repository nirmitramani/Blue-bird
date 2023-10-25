import React from 'react';
import { AiFillSetting, AiOutlineUser, AiOutlineShoppingCart, AiOutlineHome, AiOutlineLogout } from 'react-icons/ai';
import { useCookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from "react-router-dom";


const UserProfile = () => {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  
  const logout = () => {
    removeCookie('user'); 
    navigate('/'); 
  };

  const links = [
    { url: '/profile/dashboard', label: 'Dashboard', icon: <AiOutlineHome /> },
    { url: '/profile/orders', label: 'Orders', icon: <AiOutlineShoppingCart /> },
    { url: '/profile/account-details', label: 'Account Details', icon: <AiOutlineUser /> },
    { url: '/profile/change-password', label: 'Change Password', icon: <AiFillSetting /> },
    { label: 'Log out', icon: <AiOutlineLogout />, action: logout },
  ];

  return (
    <>
      <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16 ml-24">
        <div className="py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex md:flex-row w-full">
          <div className="flex flex-col md:flex-row w-full">
            <nav className="flex flex-col pb-2 w-[346px]">
              {links.map((link, index) => (
                <div key={index} onClick={link.action || undefined}>
                  <Link
                    className={`flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2 ${location.pathname === link.url ? 'bg-gray-200' : ''}`}
                    to={link.url}
                  >
                    {link.icon}
                    <span className="ml-3">{link.label}</span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

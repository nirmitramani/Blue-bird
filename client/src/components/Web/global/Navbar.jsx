import React, { useState, useEffect } from "react";
import { hamburger } from "../../../assets/icons";
import { headerLogo } from "../../../assets/images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png'
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about-us", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact-us", label: "Contacts" },
  ];

  const logout = () => {
    removeCookie('user')
    navigate('/sign-in')
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-4 py-3 bg-gray-800 text-white sticky top-0 z-50 ${isScrolled ? "scrolled" : ""
        }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="text-2xl font-semibold">

          <img src={logo} alt="logo" className="w-32" />
        </a>
        <ul className="hidden space-x-6 lg:flex">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`hover:text-blue-500 transition duration-300 ${location.pathname === item.href ? "text-navy-blue" : ""
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-6 items-center">
          <Link to="/cart">
            <button
              className="text-blue-500 hover:underline"
            >
              <div className="bg-transparent flex justify-center items-center">
                <div className="relative py-2">
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">3</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/cart">
            <button
              className="text-blue-500 hover:underline"
            >
              <div className="bg-transparent flex justify-center items-center">
                <div className="relative py-2">
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">12</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-5 w-5">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                  </svg>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/profile/dashboard">
            <button
              className="text-blue-500 hover:underline mt-3"
            >
              <div className="bg-transparent flex justify-center items-center">
                <div className="py-2">
                  <svg fill="#3b82f6" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" /></svg>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <div className="lg:hidden">
          <button className="text-white">
            <img src={hamburger} alt="hamburger icon" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

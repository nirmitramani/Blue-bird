import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import birdlogo from "../../../assets/Admin/icons/birdlogo.svg";
import { AiOutlineDashboard, AiOutlineUser, AiFillQuestionCircle, AiOutlineContacts, AiOutlineShoppingCart } from "react-icons/ai";
import { LuGalleryThumbnails } from "react-icons/lu";
import { BiSolidShoppingBags, BiCategoryAlt, BiSelectMultiple, BiSolidDiscount } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import Control from "../../../assets/Admin/icons/control.png";

import logo from '../../../assets/logo.png'

const Sidebar = ({ open, setOpen }) => {
    const location = useLocation();

    const Menus = [
        { title: "Dashboard", icon: <AiOutlineDashboard />, link: "/admin/dashboard" },
        { title: "Users", icon: <AiOutlineUser />, gap: true, link: "/admin/users" },
        { title: "Orders", icon: <AiOutlineShoppingCart />, link: "/admin/order" },
        { title: "Sliders", icon: <LuGalleryThumbnails />, link: "/admin/sliders" },
        { title: "FAQ's", icon: <AiFillQuestionCircle />, link: "/admin/faqs" },
        { title: "Coupon Code", icon: <BiSolidDiscount />, link: "/admin/coupon-code" },
        { title: "Contacts", icon: <AiOutlineContacts />, link: "/admin/contact-us" },
        { title: "Products", icon: <BiSolidShoppingBags />, link: "/admin/products" },
        { title: "Events", icon: <BsCalendar2Event />, link: "/admin/events" },
        { title: "Product Category", icon: <BiCategoryAlt />, link: "/admin/product-categories" },
        { title: "CMS Pages", icon: <BiSelectMultiple />, link: "/admin/cms-pages" },
    ];
    const isMenuActive = (link) => location.pathname.includes(link);

    return (
        <aside className="fixed">
            <div
                className={` ${open ? "w-72" : "w-20 "} bg-primary-black h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src={Control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-black border-2 rounded-full ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex items-center justify-center">
                    {open ? (
                        <img
                            src={logo}
                            className="w-28 h-12 cursor-pointer duration-500 rotate-[360deg]"
                        />
                    ) : (
                        <img
                            src={birdlogo}
                            className="w-28 h-12 cursor-pointer duration-500"
                        />
                    )}
                </div>


                <div className="menu-container overflow-y-auto h-[calc(100vh-100px)]">
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <Link key={index} to={Menu.link}>
                                <li
                                    className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-100 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"
                                        } ${isMenuActive(Menu.link) || Menu.link === location.pathname ? "bg-light-white" : ""
                                        }`}
                                >
                                    <p className={`${open && "rotate-[360deg]"} text-2xl duration-1000`}>{Menu.icon}</p>
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

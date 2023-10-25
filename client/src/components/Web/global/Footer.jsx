import { useEffect, useState } from "react";
import { facebook, instagram, copyrightSign, twitter } from "../../../assets/icons";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'
import axios from "axios";

const Footer = () => {
  const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/slider");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchImages();
  }, []);

  const footerLinks = [
    {
      title: "Help",
      links: [
        { name: "About us", link: "/" },
        { name: "FAQs", link: "/" },
        { name: "How it works", link: "/" },
        { name: "Privacy policy", link: "/" },
        { name: "Payment policy", link: "/" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { name: "customer@bluebird.com", link: "mailto:customer@bluebird.com" },
        { name: "+92554862354", link: "tel:+92554862354" },
      ],
    },
  ];

  return (
    <section className=" bg-black padding-x padding-t pb-8">
      <footer className="max-container">
        <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
          <div className="flex flex-col items-start">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                width={150}
                height={46}
                className="m-0"
              />
            </Link>
            <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
              Get shoes ready for the new term at your nearest bluebird store. Find
              Your perfect Size In Store. Get Rewards
            </p>
            <div className="flex items-center gap-5 mt-8">
              {socialMedia.map((icon) => (
                <div
                  className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
                  key={icon.alt}
                >
                  <img src={icon.src} alt={icon.alt} width={24} height={24} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-montserrat text-2xl leading-normal font-medium mb-6 text-white">
              Categories
            </h4>
            <ul>
              {categories.map((category) => (
                <li
                  className="mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray"
                  key={category._id}
                >
                  {category.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-1 justify-between flex-wrap ml-44">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="font-montserrat text-2xl leading-normal font-medium mb-6 text-white">
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      className="mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray"
                      key={link.name}
                    >
                      <Link to={link.link}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
          <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
            <img
              src={copyrightSign}
              alt="copyright sign"
              width={20}
              height={20}
              className="rounded-full m-0"
            />
            <p>Copyright. All rights reserved.</p>
          </div>
          <p className="font-montserrat cursor-pointer">Terms & Conditions</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
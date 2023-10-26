import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../hooks/Button";
import { contactusbanner } from "../../../assets/images"
import { GiWorld } from "react-icons/gi"
import { FaLocationDot } from "react-icons/fa6"
import { FaPhoneAlt, FaRegAddressCard } from "react-icons/fa"
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.warning('Please fill in all required fields.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    if (!/[a-zA-Z]/.test(formData.name)) {
      toast.warning('Please enter a valid name.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      stopLoading();
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.warning('Please enter a valid email address.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      stopLoading();
      return;
    }
    

    if (!/[a-zA-Z]/.test(formData.message)) {
      toast.warning('Please enter a valid Message.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      stopLoading();
      return;
    }

    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {

      // Create new Contact
      const response = await axios.post(`http://localhost:3000/contact-us`, formDataToSend);
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  return (
    <div className="container mx-auto md:px-6 font-montserrat">
      <section className="mb-32">
        <div className={`relative h-[300px] overflow-hidden bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${contactusbanner})` }}>
          <div className="absolute inset-0 flex mt-[-100px] items-center justify-center text-4xl text-black font-bold uppercase">
            Contact Us
          </div>
        </div>
        <div className="container px-6 md:px-12">
          <div
            className="block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
            <div className="mb-12 grid gap-x-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="mx-auto mb-12 text-center lg:mb-0">
                <GiWorld className='mb-2 w-12 h-10' />
                <h6 className="font-medium">India</h6>
              </div>
              <div className="mx-auto mb-12 text-center lg:mb-0">
                <FaLocationDot className='ml-16 mb-2 w-12 h-10' />
                <h6 className="font-medium">Ahmedabad, 382350</h6>
              </div>
              <div className="mx-auto mb-6 text-center md:mb-0">
                <FaPhoneAlt className='ml-10 mb-2 w-10 h-10' />
                <h6 className="font-medium">+ 01 234 567 89</h6>
              </div>
              <div className="mx-auto text-center">
                <FaRegAddressCard className='ml-10 mb-2 w-12 h-10' />
                <h6 className="font-medium">Tax ID: 273 384</h6>
              </div>
            </div>
            <div className="mx-auto max-w-[700px]">
              <form>
                <div className="lg:max-w-full w-full m-5 flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
                  <input
                    type="text"
                    name='name'
                    placeholder="Enter Your Name"
                    className="input text- bg-transparent"
                    value={formData.question}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="lg:max-w-full w-full m-5 flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
                  <input
                    type="text"
                    name='email'
                    placeholder="Enter Email (e.g.subscribe@bluebird.com)"
                    className="input bg-transparent"
                    value={formData.question}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="lg:max-w-full w-full m-5 flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
                  <input type="text"
                    name='message'
                    placeholder="Enter Messege"
                    className="input bg-transparent"
                    value={formData.question}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex lg:max-w-full w-full m-5 max-sm:justify-end items-center">
                  <Button label="Get in touch" fullWidth onClick={handleSubmit} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs
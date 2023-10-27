import React, { useState } from 'react';
import { google, facebook, signup } from '../../../assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';

const SignIn = () => {

  const [formData, setFormData] = useState({
    userNameOrEmail: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const navigaterote = window.location.pathname.includes('/admin') ? '/admin' : '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userNameOrEmail.trim() || !formData.password.trim()) {
      toast.warning('Please fill all fields.', {
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

    try {
      const response = await axios.post(`${window.react_app_url}auth/sign-in/${navigaterote == '/admin' ? 'admin' : 'user'}`, formData, { withCredentials: true });

      if (!response.data.status) {
        toast.error(response.data.message, {
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
      else {
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

        navigate(navigaterote, { replace: true });
      }
    } catch (error) {
      toast.error(error, {
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
    <div className="w-full min-h-screen bg-white flex justify-center items-center font-montserrat">
      <div className="w-[629px] h-[664px] left-[175px] top-[40px] absolute">
        <div className="w-[396px] h-60 left-0 top-0 absolute">
          <div className="absolute text-black text-[50px] font-semibold">Sign in to </div>
          <div className="top-[80px] absolute text-black text-[35px] font-medium">Blue Bird</div>
        </div>
        <div className="w-[321px] h-[54px] left-[4px] top-[186px] absolute">
          <div className="absolute text-black text-lg font-semibold">If you already have an account </div>
          <div className="w-[308px] top-[30px] absolute text-black text-lg">You can <Link to={'/sign-up'} className="text-lg text-navy-blue font-semibold">Register here !</Link></div>
        </div>
        <div className="w-[313px] h-[556px] left-[316px] top-[108px] absolute flex-col justify-center items-center inline-flex">
          <img src={signup} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-[369px] left-[935px] top-[80px] absolute">
          <div className="w-[369px] h-[62px] left-0 top-[73px] absolute bg-indigo-50 rounded-lg">
            <input
              type="text"
              className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] outline-none"
              placeholder="Enter User Name Or Email"
              name='userNameOrEmail'
              value={formData.userNameOrEmail}
              onChange={handleChange}
            />
          </div>
          <div className="w-[369px] h-[62px] left-0 top-[150px] absolute bg-indigo-50 rounded-lg">

            <div className="relative">
              <input
                className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] font-normal outline-none"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                className="absolute right-2 top-[26px]"
                type="button"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <FaEye style={{ width: '20px' }} />
                ) : (
                  <FaEyeSlash style={{ width: '20px' }} />
                )}

              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-[369px] h-[59px] left-0 top-[250px] absolute bg-navy-blue rounded-[9px] shadow-2xl text-white text-base font-medium outline-none cursor-pointer"
          >
            Sing In
          </button>

          <div className="left-[120px] top-[335px] absolute text-zinc-400 text-base font-medium">or continue with</div>
          <div className="w-[165px] h-[43.12px] left-[102px] top-[370px] absolute">
            <div className="w-[32.46px] h-[32.46px] left-9 top-[4.66px] absolute flex-col justify-start items-start inline-flex">
              <img src={google} alt="google" />
            </div>
            <div className="w-[41.46px] h-[41.46px] left-[80.19px] top-0 absolute flex-col justify-start items-start inline-flex">
              <img src={facebook} alt="facebook" />
            </div>
          </div>
          <div className="left-0 top-0 absolute text-black text-3xl font-semibold">Sign In</div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
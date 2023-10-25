import React, { useState } from 'react';
import { google, facebook, signup } from '../../../assets/icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    try {
      const response = await axios.post(`${window.react_app_url}auth/sign-up`, formData, { withCredentials: true });
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
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div className="w-full min-h-screen bg-white flex justify-center items-center font-montserrat">
      <div className="w-[629px] h-[664px] left-[175px] top-[200px] absolute">
        <div className="w-[396px] h-60 left-0 top-0 absolute">
          <div className="absolute text-black text-[50px] font-semibold">Sign Up to </div>
          <div className="top-[80px] absolute text-black text-[35px] font-medium">Blue Bird</div>
        </div>
        <div className="w-[321px] h-[54px] left-[4px] top-[186px] absolute">
          <div className="absolute text-black text-lg font-semibold">If you already have an account </div>
          <div className="w-[308px] top-[30px] absolute text-black text-lg">You can <span className="text-lg text-navy-blue font-semibold">Login here !</span></div>
        </div>
        <div className="w-[313px] h-[556px] left-[316px] top-[108px] absolute flex-col justify-center items-center inline-flex">
          <img src={signup} />
        </div>
      </div>
      <div className="w-[369px] h-[700.12px] left-[935px] absolute">
        <form onSubmit={handleSubmit}>
          <div className="w-[369px] h-[62px] left-0 top-[73px] absolute bg-indigo-50 rounded-lg">
            <input
              type="text"
              className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] outline-none"
              placeholder="Enter Email"
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-[369px] h-[62px] left-0 top-[153px] absolute bg-indigo-50 rounded-lg">
            <input
              type="text"
              className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] font-normal outline-none"
              placeholder="Create User name"
              name='userName'
              onChange={handleInputChange}
              value={formData.userName}
            />
          </div>
          <div className="w-[369px] h-[62px] left-0 top-[233px] absolute bg-indigo-50 rounded-lg">
            <input
              type="text"
              className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] font-normal outline-none"
              placeholder="Contact number"
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-[369px] h-[62px] left-0 top-[394px] absolute bg-indigo-50 rounded-lg">
            <input
              type="password"
              className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] font-normal outline-none"
              placeholder="Confirm Password"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-[369px] h-[62px] left-0 top-[313px] absolute bg-indigo-50 rounded-lg">
            <input
              type="password"
              className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] font-normal outline-none"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-[369px] h-[59px] left-0 top-[484px] absolute bg-navy-blue rounded-[9px] shadow-2xl text-white text-base font-medium outline-none cursor-pointer"
          >
            Register
          </button>

          <div className="left-[120px] top-[590px] absolute text-zinc-400 text-base font-medium">or continue with</div>
          <div className="w-[165px] h-[43.12px] left-[102px] top-[650px] absolute">
            <div className="w-[32.46px] h-[32.46px] left-9 top-[4.66px] absolute flex-col justify-start items-start inline-flex">
              <img src={google} alt="google" />
            </div>
            <div className="w-[41.46px] h-[41.46px] left-[80.19px] top-0 absolute flex-col justify-start items-start inline-flex">
              <img src={facebook} alt="facebook" />
            </div>
          </div>
        </form>
      </div>
    </div >
  );
};

export default SignUp;
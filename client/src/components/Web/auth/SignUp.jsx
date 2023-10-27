import React, { useState } from 'react';
import { google, facebook, signup } from '../../../assets/icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useLoader from '../../Admin/hooks/useLoader';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const SignUp = () => {
  const navigate = useNavigate();
  const { loading, startLoading, stopLoading, Loader } = useLoader();
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key.length === 1 && !/^\d$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }

    if (formData.phone.length >= 10 && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    if (!formData.userName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
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

    if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      toast.warning('Please enter a valid 10-digit phone number.', {
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



    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(formData.password)) {
      setPasswordError('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.');
      stopLoading();
      return;
    }

    setPasswordError('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.');

    if (formData.password !== formData.confirmPassword) {
      toast.warning('Passwords do not match.', {
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
      } else {
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
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="w-full min-h-screen bg-white flex justify-center items-center font-montserrat">
        <div className="w-[629px] h-[664px] left-[175px] top-[200px] absolute">
          <div className="w-[396px] h-60 left-0 top-0 absolute">
            <div className="absolute text-black text-[50px] font-semibold">Sign Up to </div>
            <div className="top-[80px] absolute text-black text-[35px] font-medium">Blue Bird</div>
          </div>
          <div className="w-[321px] h-[54px] left-[4px] top-[186px] absolute">
            <div className="absolute text-black text-lg font-semibold">If you already have an account </div>
            <div className="w-[308px] top-[30px] absolute text-black text-lg">You can <Link to={'/sign-in'}><span className="text-lg text-navy-blue font-semibold">Login here !</span></Link></div>
          </div>
          <div className="w-[313px] h-[556px] left-[316px] top-[108px] absolute flex-col justify-center items-center inline-flex">
            <img src={signup} alt="Signup" />
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
                onKeyDown={handlePhoneKeyDown}
              />
            </div>

            <div className="w-[369px] h-[62px] left-0 top-[313px] absolute bg-indigo-50 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] font-normal outline-none"
                placeholder="Password"
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye className='ml-[340px] mt-6 text-lg' /> : <FaEyeSlash className='ml-[340px] mt-6 text-lg' />}
              </span>
            </div>

            <div className="w-[369px] h-[62px] left-0 top-[394px] absolute bg-indigo-50 rounded-lg">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-[317px] h-[32px] left-[26px] top-[15px] absolute bg-transparent text-[15px] font-normal outline-none"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEye className='ml-[340px] mt-6 text-lg' /> : <FaEyeSlash className='ml-[340px] mt-6 text-lg' />}
              </span>
            </div>
            {/* 
            {passwordError && (
              <div className="text-red-600 text-sm mt-[420px] ml-4">
                {passwordError}
              </div>
            )}

            <button
              type="submit"
              className="w-[369px] h-[59px] left-0 top-[484px] absolute bg-navy-blue rounded-[9px] shadow-2xl text-white text-base font-medium outline-none cursor-pointer"
            >
              Register
            </button> */}

            <div
              className={`text-red-600 text-sm mt-[420px] ml-4`}
            >
              {passwordError}
            </div>

            <div className={`absolute left-0 top-${passwordError ? '560px' : '484px'} w-[369px]`}>
              <button
                type="submit"
                className="w-[369px] h-[59px] bg-navy-blue rounded-[9px] shadow-2xl text-white text-base font-medium outline-none cursor-pointer"
              >
                Register
              </button>
            </div>

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
      </div>
    </>
  );
};

export default SignUp;

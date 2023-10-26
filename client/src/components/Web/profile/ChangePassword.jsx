import React, { useState } from 'react'
import UserProfile from './UserProfile'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match", {
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

        const res = await axios
            .put(`${window.react_app_url + window.user_url + '/change-password'}/${id}`, {
                password: formData.password,
            });

        if (res.data.status) {
            toast.success(res.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            // navigate('/profile/dashboard');
        }
    };

    return (
        <>
            <div className="flex flex-wrap font-montserrat">
                <div className="w-full md:w-1/3">
                    <UserProfile />
                </div>
                <div className="w-[50%] mt-20">
                    <div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">Change Password</h2>
                        <div className="w-full flex  h-full lg:w-8/12 flex-col relative">
                            <form className="w-full mx-auto flex flex-col justify-center" onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-3">
                                    <div className="mb-4">
                                        <div className="block">
                                            <label htmlFor="password" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Old Password *</label>
                                            <input
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="py-2 px-4 md:px-5 w-[800px] appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="block">
                                            <label htmlFor="confirmPassword" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">New Password *</label>
                                            <input
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="py-2 px-4 md:px-5 w-[800px] appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            type='submit'
                                            className='bg-black text-white mt-3 px-6 py-2 w-56'
                                        >
                                            CHANGE PASSWORD
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword

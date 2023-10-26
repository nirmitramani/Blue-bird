import React, { useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from '../hooks/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useLoader from '../../Admin/hooks/useLoader';
import axios from 'axios';
import { toast } from 'react-toastify';


const AccountDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, startLoading, stopLoading, Loader } = useLoader();
    const [userData, setUserData] = useState('');
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const initialFormData = {
        userName: '',
        email: '',
        phone: '',
        profileimg: null,
        gender: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(selectedImage);

            setFormData((prevFormData) => ({
                ...prevFormData,
                profileimg: selectedImage,
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const toggleEditing = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const fetchData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${window.react_app_url + window.user_url}`);
            const user = response.data.data.find((user) => user.role === 'user');
            setUserData(user);
            setFormData({
                userName: user.userName,
                email: user.email,
                profileimg: formData.profileimg,
                phone: user.phone,
                gender: user.gender,
            });
            if (user.profileimg) {
                setImage(`http://localhost:3000/public/images/user/${user.profileimg}`);
            }
            stopLoading()
        } catch (error) {
            console.error('Error fetching user data:', error);
            stopLoading()
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading()
        const formDataToSend = new FormData();
        formDataToSend.append('userName', formData.userName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('gender', formData.gender);

        if (formData.profileimg) {
            formDataToSend.append('profileimg', formData.profileimg);
        }
        if (isEditing) {
            try {
                const res = await axios.put(
                    `${window.react_app_url + window.user_url}/${userData._id}`,
                    formDataToSend,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

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
                    // navigate('/');
                    stopLoading()
                }
                stopLoading()
            } catch (error) {
                toast.error('Error updating user data', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                stopLoading()
            }
        }
        setIsEditing(false);
    };


    return (
        <div>
            {loading && <Loader />}

            <div className="flex flex-wrap font-montserrat">
                <div className="w-full md:w-1/3">
                    <UserProfile />
                </div>
                <div className="w-[50%] mt-20">
                    <div className="w-full flex flex-col relative">
                        <form className="w-full mx-auto flex flex-col justify-center" onSubmit={handleSubmit}>
                            <div className='flex flex-row justify-between'>
                                <p className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">Account Details</p>
                                {isEditing ?
                                    (
                                        <button
                                            type='button'
                                            className='text-3xl -mt-7'
                                            onClick={toggleEditing}>
                                            <AiFillCloseCircle />
                                        </button>
                                    ) : (
                                        <button
                                            type='button'
                                            className='text-3xl -mt-7'
                                            onClick={toggleEditing}>
                                            <BiSolidMessageSquareEdit />
                                        </button>
                                    )}


                            </div>
                            <div className="flex flex-col space-y-4 sm:space-y-5">
                                <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
                                    <div className="px-28 flex justify-center items-center">
                                        <label htmlFor="profile-image" className="cursor-pointer">
                                            {image ? (
                                                <img
                                                    src={image}
                                                    alt="Profile"
                                                    className="w-40 h-40 rounded-full border-2 border-gray-200 shadow-lg"
                                                />
                                            ) : (
                                                <img
                                                    src="https://i.stack.imgur.com/l60Hf.png"
                                                    alt="Profile"
                                                    className="w-40 h-40 rounded-full border-2 border-gray-200 shadow-lg"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                id="profile-image"
                                                name="profile-image"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={isEditing ? handleImageChange : null}
                                                readOnly={!isEditing}
                                            />
                                        </label>
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="email" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Email *</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={`py-2 px-4 md:px-5 w-full appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus-border-heading h-11 md:h-12 rounded-md ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                            value={formData.email}
                                            onChange={isEditing ? handleInputChange : null}
                                            readOnly={!isEditing}
                                        />

                                        <div className="mt-4">
                                            <div className="relative flex flex-col">
                                                <span className="mt-2 text-sm text-heading font-semibold block pb-1">Gender</span>
                                                <div className="mt-2 flex items-center gap-x-6">
                                                    <label className="group flex items-center text-heading text-sm cursor-pointer">
                                                        <input type="radio" className={`form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading
                                                         ${!isEditing ? 'cursor-not-allowed' : ''}`} name="gender"
                                                            value="Male"
                                                            checked={formData.gender === "Male"}
                                                            onChange={isEditing ? handleInputChange : null}
                                                            readOnly={!isEditing}
                                                        />
                                                        <span className="ms-2 text-sm text-heading relative">Male</span>
                                                    </label>
                                                    <label className="group flex items-center text-heading text-sm cursor-pointer">
                                                        <input type="radio" className={`form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading 
                                                        ${!isEditing ? 'cursor-not-allowed' : ''}`} name="gender"
                                                            value="Female"
                                                            checked={formData.gender === "Female"}
                                                            onChange={isEditing ? handleInputChange : null}
                                                            readOnly={!isEditing}
                                                        />
                                                        <span className="ms-2 text-sm text-heading relative">Female</span>
                                                    </label>
                                                    <label className="group flex items-center text-heading text-sm cursor-pointer">
                                                        <input type="radio" className={`form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading
                                                        ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                                            name="gender"
                                                            value="Other"
                                                            checked={formData.gender === "Other"}
                                                            onChange={isEditing ? handleInputChange : null}
                                                            readOnly={!isEditing}
                                                        />
                                                        <span className="ms-2 text-sm text-heading relative">Other</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:gap-x-3">
                                    <div className="w-full sm:w-1/2">
                                        <label htmlFor="phone" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Phone / Mobile *</label>
                                        <input id="phone" name="phone" type="number"
                                            className={`py-2 px-4 md:px-5 w-full appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                            value={formData.phone}
                                            onChange={isEditing ? handleInputChange : null}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label htmlFor="userName" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">User Name *</label>
                                        <input id="userName" name="userName" type="text"
                                            className={`py-2 px-4 md:px-5 w-full appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                            value={formData.userName}
                                            onChange={isEditing ? handleInputChange : null}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                            {isEditing &&
                                <button
                                    type='submit'
                                    className='bg-black text-white mt-3 px-4 py-1 w-24'
                                >
                                    SAVE
                                </button>
                            }
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AccountDetails

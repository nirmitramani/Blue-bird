import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../hooks/Button';
import BreadCrumb from '../../hooks/BreadCrumb';
import { toast } from 'react-toastify';

const AddUpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phone: '',
        profileimg: null,
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (id) {
            axios.get(`${window.react_app_url + window.user_url}/${id}`)
                .then(response => {
                    response.data.status ? setFormData(response.data.data) : console.error('Error fetching user data:', error);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);

    // useEffect(() => {
    //     axios.get(`${window.react_app_url + window.user_category_url}`)
    //         .then(response => {
    //             setUsers(response.data.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching user data:', error);
    //         });
    // });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileimg') {
            const file = files[0];
            if (file) {
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    setFormData({
                        ...formData,
                        [name]: file,
                    });
                } else {
                    e.target.value = null;
                    toast.error('Please select a jpg or png image.');
                }
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((file, index) => {
                    formDataToSend.append(`${key}_${index}`, file);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            if (id) {
                // Update existing user
                const response = await axios.put(`${window.react_app_url + window.user_url}/${id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
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
            } else {
                const requiredFields = [
                    'userName',
                    'email',
                    'phone',
                    'profileimg',
                ];

                let hasMissingFields = false;

                for (const fieldName of requiredFields) {
                    if (!formData[fieldName]) {
                        hasMissingFields = true;
                        break;
                    }
                }

                if (hasMissingFields) {
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

                const response = await axios.post(`${window.react_app_url + window.user_url}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

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
            }
            navigate('/admin/users');
        } catch (error) {
            console.error('Error:', error);
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
        <>
            <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                    <BreadCrumb title="User / " desc={id ? 'Update User' : 'Add User'} link="/admin/users" />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mx-24">
                    <div>
                        <label htmlFor="userName" className="mt-4 block text-sm font-medium text-gray-900">
                            Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Name"
                            required
                        />
                        <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Email
                        </label>
                        <textarea
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Email"
                            required
                        />
                        <label htmlFor="phone" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Phone
                        </label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Phone"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profileimg" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="profileimg"
                            name="profileimg"
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required={id ? false : true}
                        />
                    </div>
                </div>
                <div className="ml-20 mt-12">
                    <Button label="Submit" type="submit" width="32" bgColor="blue" />
                    <Button label="Reset" type="reset" width="32" bgColor="red" />
                </div>
            </form>
        </>
    );
};

export default AddUpdateUser;

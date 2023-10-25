import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../hooks/Button';
import BreadCrumb from '../../hooks/BreadCrumb';
import { toast } from 'react-toastify';
import useLoader from '../../hooks/useLoader';

const AddUpdateCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, startLoading, stopLoading, Loader } = useLoader();

    const initialFormData = {
        name: '',
        productcategoryimg: null,
        gender: '',
    };

    const [formData, setFormData] = useState(initialFormData);


    useEffect(() => {
        if (id) {
            startLoading();

            axios.get(`${window.react_app_url + window.product_category_url}/${id}`)
                .then((response) => {
                    const { name, gender } = response.data.data;
                    setFormData({ name, gender });
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    stopLoading();
                });
        }
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'productcategoryimg') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('productcategoryimg', formData.productcategoryimg);

        try {
            if (id) {
                // Update existing product categoryimg
                const response = await axios.put(`${window.react_app_url + window.product_category_url}/${id}`, formDataToSend, {
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
                const requiredFields = ['name', 'productcategoryimg'];
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

                const response = await axios.post(`${window.react_app_url + window.product_category_url}`, formDataToSend, {
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
            navigate('/admin/product-categories');
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
        finally {
            stopLoading();
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                    <BreadCrumb title="Product Category / " desc={id ? 'Update Category' : 'Add Category'} link="/admin/product-categories" />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mx-24 space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Title"

                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="productcategoryimg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Image
                        </label>
                        <input
                            type="file"
                            id="productcategoryimg"
                            name="productcategoryimg"
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        // required={id ? false : true}
                        />
                    </div>
                </div>
                <div className="ml-20 mt-12">
                    <Button label={id ? 'Update' : 'Submit'} type="submit" width="32" bgColor="blue" />
                    <Button label="Reset" type="reset"
                        onClick={() => {
                            setFormData(initialFormData)
                        }}
                        width="32" bgColor="red" />
                </div>
            </form>
        </>
    );
};

export default AddUpdateCategory;

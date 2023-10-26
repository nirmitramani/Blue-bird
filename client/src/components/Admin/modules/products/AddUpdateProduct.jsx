import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../hooks/Button';
import BreadCrumb from '../../hooks/BreadCrumb';
import { toast } from 'react-toastify';
import useLoader from '../../hooks/useLoader';


const AddUpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, startLoading, stopLoading, Loader } = useLoader();
    const [productCategories, setProductCategories] = useState([]);

    const initialFormData = {
        name: '',
        description: '',
        price: '',
        categoryid: '',
        productimg: null,
        productthumbimg: null
    };

    const [formData, setFormData] = useState(initialFormData);

    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        if (id && !dataFetched) {
            startLoading();
            axios
                .get(`${window.react_app_url + window.product_url}/${id}`)
                .then((response) => {
                    response.data.status ? setFormData(response.data.data) : console.error('Error fetching product data:', error);

                    stopLoading();
                    setDataFetched(true);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    stopLoading();
                    navigate('/admin/products');
                });
        }
    }, [id, dataFetched, navigate]);


    useEffect(() => {
        axios.get(`${window.react_app_url + window.product_category_url}`)
            .then(response => {
                setProductCategories(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    });


    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'productimg') {
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
        } else if (name === 'productthumbimg') {
            const file = files[0];
            if (file) {
                if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/webp') {
                    setFormData({
                        ...formData,
                        productthumbimg: Array.from(files),
                    });
                } else {
                    e.target.value = null;
                    toast.error('Please select a jpg / png / jpeg / webp image.');
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
        startLoading();
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
                if (!dataFetched) {
                    navigate('/admin/products');
                }
                if (dataFetched) {
                    const response = await axios.put(`${window.react_app_url + window.product_url}/${id}`, formDataToSend, {
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
            } else {
                const requiredFields = [
                    'name',
                    'description',
                    'price',
                    'categoryid',
                    'productimg',
                    'productthumbimg',
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

                const response = await axios.post(`${window.react_app_url + window.product_url}`, formDataToSend, {
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
            navigate('/admin/products');
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
                    <BreadCrumb title="Product / " desc={id ? 'Update Product' : 'Add Product'} link="/admin/products" />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mx-24">
                    <div>
                        <label htmlFor="name" className="mt-4 block text-sm font-medium text-gray-900">
                            Name
                        </label>
                        {name}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Name"
                        />
                        <label htmlFor="description" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Description
                        </label>
                        <textarea
                            type="textarea"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Description"
                        />
                        <label htmlFor="price" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Price"
                        />
                        <label htmlFor="stockquantity" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            id="stockquantity"
                            name="stockquantity"
                            value={formData.stockquantity}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Stock Quantity"
                        />
                        <label htmlFor="category" className="mt-4 block text-sm font-medium text-gray-900">
                            Product Category
                        </label>
                        <select
                            id="category"
                            name="categoryid"
                            value={formData.categoryid}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Select Product Category</option>
                            {productCategories.length > 0 ? (
                                <>
                                    <optgroup label="Male">
                                        {productCategories.map((category) => {
                                            if (category.gender === "male") {
                                                return (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                );
                                            }
                                            return null;
                                        })}
                                    </optgroup>
                                    <optgroup label="Female">
                                        {productCategories.map((category) => {
                                            if (category.gender === "female") {
                                                return (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                );
                                            }
                                            return null;
                                        })}
                                    </optgroup>
                                </>
                            ) : (
                                <option value="" disabled>
                                    No category
                                </option>
                            )}
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="productimg" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Product Image
                        </label>
                        <input
                            type="file"
                            id="productimg"
                            name="productimg"
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="productthumbimg" className="mt-4 block text-sm font-medium text-gray-900 ">
                            Product Thumbnail Images
                        </label>
                        <input
                            type="file"
                            id="productthumbimg"
                            name="productthumbimg"
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            multiple
                        />
                    </div>
                </div>
                <div className="ml-20 mt-12">
                    <Button label="Submit" type="submit" width="32" bgColor="blue" />
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

export default AddUpdateProduct;

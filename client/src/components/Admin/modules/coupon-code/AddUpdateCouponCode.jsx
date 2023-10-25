import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../hooks/Button';
import BreadCrumb from '../../hooks/BreadCrumb';
import { toast } from 'react-toastify';

const AddUpdateCouponCode = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentDate = new Date().toISOString().split('T')[0];

  const initialFormData = {
    title: '',
    code: '',
    description: '',
    discount: '',
    maxDiscount: '',
    minimumOrderValue: '',
    startDate: currentDate,
    endDate: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (id) {
      axios.get(`${window.react_app_url + window.coupon_code_url}/${id}`)
        .then((response) => {
          setFormData(response.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name == 'code') {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.title || !formData.code || !formData.description || !formData.discount || !formData.maxDiscount || !formData.startDate || !formData.endDate || !formData.minimumOrderValue) {
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

      if (id) {
        // Update existing Coupon Code
        const response = await axios.put(`${window.react_app_url + window.coupon_code_url}/${id}`, formData);
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
        // Create new Coupon Code
        const response = await axios.post(`${window.react_app_url + window.coupon_code_url}`, formData);
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

      // Reset the form and navigate back
      setFormData(initialFormData);
      navigate('/admin/coupon-code');
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <BreadCrumb title="Coupon Code / " desc={id ? 'Update Coupon Code' : 'Add Coupon Code'} link="/admin/coupon-code" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-24 space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Title"
            />
          </div>
          <div>
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Code
            </label>
            <input
              type='text'
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Code"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <input
              type='text'
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Description"
            />
          </div>
          <div>
            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Discount
            </label>
            <input
              type='number'
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Discount"
            />
          </div>
          <div>
            <label htmlFor="maxDiscount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Max Discount
            </label>
            <input
              type='number'
              id="maxDiscount"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Max Discount"
            />
          </div>
          <div>
            <label htmlFor="minimumOrderValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Minimum Order Value
            </label>
            <input
              type='number'
              id="minimumOrderValue"
              name="minimumOrderValue"
              value={formData.minimumOrderValue}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Minimum Order Value"
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Start Date
            </label>
            <input
              type='date'
              id="startDate"
              name="startDate"
              value={formatDate(formData.startDate)}
              onChange={handleInputChange}
              min={formatDate(formData.startDate) ? formatDate(formData.startDate) : currentDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Start Date"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              End Date
            </label>
            <input
              type='date'
              id="endDate"
              name="endDate"
              value={formatDate(formData.endDate)}
              onChange={handleInputChange}
              min={formatDate(formData.startDate)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter End Date"
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
  )
}

export default AddUpdateCouponCode;
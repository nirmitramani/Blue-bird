import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../hooks/Button';
import BreadCrumb from '../../hooks/BreadCrumb';
import { toast } from 'react-toastify';
import useLoader from '../../hooks/useLoader';

const AddUpdateProductStockAndSize = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, startLoading, stopLoading, Loader } = useLoader();

  const initialFormData = {
    size: '',
    stockQuantity: '',
    productId: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${window.react_app_url + window.product_url}`)
      .then(res => {
        setProducts(res.data.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  useEffect(() => {
    if (id) {
      startLoading();
      axios.get(`${window.react_app_url + window.product_stock_size}/${id}`)
        .then(response => {
          const { size, stockQuantity, productId } = response.data.data;
          setFormData({ size, stockQuantity, productId });
          stopLoading();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          stopLoading();
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stockQuantity') {
      setFormData({
        ...formData,
        [name]: value.replace(/\D/g, ''),
      });
    }
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    if (name == 'size') {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    if (!formData.size || !formData.stockQuantity || !formData.productId) {
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
    if (parseFloat(formData.stockQuantity) <= 0) {
      toast.error(`Stock Quantity must be greater than 0.`, {
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

      if (id) {
        const response = await axios.put(`${window.react_app_url + window.product_stock_size}/${id}`, formData);
        if (response.data.status) {
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
          navigate('/admin/product-stock-size');
        } else {
          toast.error(response.data.message || 'An error occurred', {
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
        const response = await axios.post(`${window.react_app_url + window.product_stock_size}`, formData);
        if (response.data.status) {
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
          navigate('/admin/product-stock-size');
        } else {
          toast.error(response.data.message || 'An error occurred', {
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
      }
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
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <BreadCrumb title="Add Product Stock & Size / " desc={id ? 'Update Product Stock & Size' : 'Add Product Stock & Size'} link="/admin/product-stockQuantity-size" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-24 space-y-4">
          <div>
            <label htmlFor="productId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select a Product
            </label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select a Product</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Size
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Size"
            />
          </div>
          <div>
            <label htmlFor="stockQuantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Stock
            </label>
            <input
              type="text"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Stock"
            />
          </div>
        </div>
        <div className="ml-20 mt-12">
          <Button label={id ? 'Update' : 'Submit'} type="submit" width="32" bgColor="blue" />
          <Button
            label={id ? 'Cancel' : 'Reset'}
            type='reset'
            onClick={() => {
              if (id) {
                navigate('/admin/product-stock-size');

              } else {
                setFormData(initialFormData);
              }
            }}
            width="32"
            bgColor={id ? "gray" : "red"}
          />
        </div>
      </form>
    </>
  );
};

export default AddUpdateProductStockAndSize;

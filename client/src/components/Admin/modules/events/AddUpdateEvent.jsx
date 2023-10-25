import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../hooks/Button';
import BreadCrumb from '../../hooks/BreadCrumb';
import { toast } from 'react-toastify';
import useLoader from '../../hooks/useLoader';

const AddUpdateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, startLoading, stopLoading, Loader } = useLoader();

  const initialFormData = {
    name: '',
    description: '',
    eventimg: null,
  };

  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    if (id) {
      startLoading();
      axios.get(`${window.react_app_url + window.event_url}/${id}`)
        .then((response) => {
          response.data.status ? setFormData(response.data.data) : console.error('Error fetching product data:', error);
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
    if (name === 'eventimg') {
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
    formDataToSend.append('description', formData.description);
    formDataToSend.append('eventimg', formData.eventimg);

    try {
      if (id) {
        // Update existing event
        const response = await axios.put(`${window.react_app_url + window.event_url}/${id}`, formDataToSend, 
        {
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
        const requiredFields = ['name', 'description', 'eventimg'];
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

        const response = await axios.post(`${window.react_app_url + window.event_url}`, formDataToSend, {
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
      navigate('/admin/events');
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
    finally {
      stopLoading();
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <BreadCrumb title="Event / " desc={id ? 'Update Event' : 'Add Event'} link="/admin/events" />
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
              placeholder="Enter name"

            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter description"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div>
            <label htmlFor="eventimg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image
            </label>
            <input
              type="file"
              id="eventimg"
              name="eventimg"
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

export default AddUpdateEvent;

import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../hooks/BreadCrumb';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCmsPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true);
  const [cms, setCms] = useState(null);

  useEffect(() => {
    axios.get(`${window.react_app_url + window.cms_page_url}/${id}`)
      .then(result => {
        setCms(result.data.data); 
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <BreadCrumb title="CMS Pages / " desc='View CMS' link="/admin/cms-pages" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <p className='p-3'>Loading...</p>
            ) : (
              <table className="min-w-full leading-normal">
                <tbody>
                  <tr className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                    <th className='p-4'>Page Name</th>
                    <td className='p-4'>{cms.title}</td>
                  </tr>
                  <tr className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                    <th className='p-4'>Description</th>
                    <td className='p-4'>{cms.description}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewCmsPage

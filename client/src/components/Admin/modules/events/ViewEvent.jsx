import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../hooks/BreadCrumb';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEvent = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [events, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`${window.react_app_url + window.event_url}/${id}`)
            .then(result => {
                setEvent(result.data.data);
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
                    <BreadCrumb title="Event / " desc='View Event' link="/admin/events" />
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
                                        <th className='p-4'>Title</th>
                                        <td>{events.name}</td>
                                    </tr>
                                    <tr className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                                        <th className='p-4'>Title</th>
                                        <td>{events.description}</td>
                                    </tr>
                                    <tr key={events._id} className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                                        <th className='p-4'>Status</th>
                                        <td>
                                            <span className={`relative inline-block px-3 py-1 font-semibold ${events.status === 'Inactive' ? 'text-red-900' : 'text-green-900'
                                                } leading-tight`}>
                                                <span aria-hidden className={`absolute inset-0 ${events.status === 'Inactive' ? 'bg-red-200' : 'bg-green-200'} opacity-50 rounded-full`}></span>
                                                <span className="relative">
                                                    {events.status}
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className='px-5 py-5 border border-gray-200 bg-white text-sm'>
                                        <th className='p-4'>Image</th>
                                        <td className='flex'>
                                            <img
                                                src={`http://localhost:3000/public/images/events/${events.eventimg}`}
                                                alt={events.title}
                                                className='w-48 p-4'
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewEvent;

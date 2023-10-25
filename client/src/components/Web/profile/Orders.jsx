import React from 'react'
import UserProfile from './UserProfile'

const Orders = () => {

    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-1/3">
                <UserProfile />
            </div>
            <div className="w-[60%] mt-20">
                <div className="mt-0">
                    <h2 className="mb-6 font-bold text-xl">Orders</h2>
                    <div className="-mx-8">
                        <div className="px-2">
                        <table className="w-full text-left text-sm font-light mb-4">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Order</th>
                                        <th scope="col" className="px-6 py-4">Date</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4">Total</th>
                                        <th scope="col" className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium"># 3431</td>
                                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap px-6 py-4">8484</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button className='p-3 bg-slate-950 rounded-lg text-white px-7'>View</button></td>
                                    </tr>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium"># 3431</td>
                                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap px-6 py-4">8484</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button className='p-3 bg-slate-950 rounded-lg text-white px-7'>View</button></td>
                                    </tr>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium"># 3431</td>
                                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap px-6 py-4">8484</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button className='p-3 bg-slate-950 rounded-lg text-white px-7'>View</button></td>
                                    </tr>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium"># 3431</td>
                                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap px-6 py-4">8484</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button className='p-3 bg-slate-950 rounded-lg text-white px-7'>View</button></td>
                                    </tr>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium"># 3431</td>
                                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap px-6 py-4">8484</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button className='p-3 bg-slate-950 rounded-lg text-white px-7'>View</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders

import React from 'react'
import UserProfile from './UserProfile'

const Dashboard = () => {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/3">
                    <UserProfile />
                </div>
                <div className="w-[50%] mt-20">
                    <div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">Dashboard</h2>
                        <div className="w-full flex  h-full lg:w-8/12 flex-col relative">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

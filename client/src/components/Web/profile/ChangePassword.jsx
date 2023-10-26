import React from 'react'
import UserProfile from './UserProfile'

const ChangePassword = () => {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/3">
                    <UserProfile />
                </div>
                <div className="w-[50%] mt-20">
                    <div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">
                        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">Change Password</h2>
                        <div className="w-full flex  h-full lg:w-8/12 flex-col relative">
                            <form className="w-full mx-auto flex flex-col justify-center ">
                                <div className="flex flex-col space-y-3">
                                    <div className="mb-4">
                                        <div className="block">
                                            <label for="displayName" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Old Password *</label>
                                            <input id="displayName" name="displayName" type="text" placeholder="" className="py-2 px-4 md:px-5 w-[800px] appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md" autoComplete="off" spellcheck="false" aria-invalid="false" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="block">
                                            <label for="displayName" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">New Password *</label>
                                            <input id="displayName" name="displayName" type="text" placeholder="" className="py-2 px-4 md:px-5 w-[800px] appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md" autoComplete="off" spellcheck="false" aria-invalid="false" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            type='submit'
                                            className='bg-black text-white mt-3 px-6 py-3 w-56'
                                        >
                                            CHANGE PASSWORD
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword

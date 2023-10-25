import React, { useState } from 'react';
import Button from '../hooks/Button';

const Profile = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <main className="profile-page mt-56">
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-slate-100 w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="mt-12 flex justify-center items-center">
                                <label htmlFor="profile-image" className="cursor-pointer">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full border-2 border-gray-200 shadow-lg"
                                        />
                                    ) : (
                                        <img
                                            src="../logo.png"
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full border-2 border-gray-200 shadow-lg"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        id="profile-image"
                                        name="profile-image"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            <form>
                                <div className="mx-24 space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                </div>
                                <div className="ml-20 mt-12">
                                    <Button label='Update' type="submit" width="48" bgColor="blue" />
                                </div>
                            </form>
                        </div>
                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                    <p className="mb-4 text-lg leading-relaxed text-blue-700 cursor-pointer hover:underline">
                                        Want to change Password ?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;

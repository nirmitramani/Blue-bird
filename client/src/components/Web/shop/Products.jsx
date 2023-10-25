import { useEffect, useState } from "react";
import { star, cart, heart } from "../../../assets/icons";
import {
    shoe4,
    shoe5,
    shoe6,
    shoe7,
} from "../../../assets/images";
import ManImage1 from "../../../assets/images/m-bistic-3.jpg"
import ManImage2 from "../../../assets/images/m-black-1.jpg"
import ManImage3 from "../../../assets/images/m-neviblue-1.jpg"
import Button from "../hooks/Button";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


const Products = () => {
    const [visibleProducts, setVisibleProducts] = useState(12);
    const [productCategories, setProductCategories] = useState([]);

    useEffect(() => {
        axios.get(`${window.react_app_url + window.product_category_url}`)
            .then(result => {
                setProductCategories(result.data.data);
            })
            .catch(err => console.log(err))
    }, []);

    const loadMore = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
    };

    const products = [
        {
            imgURL: ManImage1,
            name: "Nike Air Jordan-01",
            price: "$200.20",
        },
        {
            imgURL: ManImage1,
            name: "Nike Air Jordan-10",
            price: "$210.20",
        },
        {
            imgURL: ManImage1,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage2,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-001",
            price: "$230.20",
        },
        {
            imgURL: ManImage3,
            name: "Nike Air Jordan-100",
            price: "$220.20",
        },
    ];

    return (
        <>

            <div className="p-20 pt-16 font-montserrat bg-slate-100">
                <div className="container">
                    <div className="flex flex-wrap flex-col lg:flex-row -mx-4">
                        <div className="lg:w-1/4 px-4 order-last lg:order-first mt-8 lg:mt-0">
                            <div className="-ml-1">
                                <div className="mb-12">
                                    <h4 className="font-medium text-md lg:text-lg text-dark capitalize mb-10">Search</h4>
                                    <div className="w-[90%] relative flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                                        <div className="grid place-items-center h-full w-12 text-gray-300">
                                            <FaSearch />
                                        </div>
                                        <input
                                            className="peer w-full outline-none text-sm text-gray-700 pr-2"
                                            type="search"
                                            id="search"
                                            placeholder="Search something.."
                                        />
                                    </div>
                                </div>


                                <div className="mb-12">
                                    <h4 className="font-medium text-md lg:text-lg text-dark capitalize mb-8">Male</h4>
                                    <ul>
                                        {productCategories.map((category) => {
                                            if (category.gender === "male") {
                                                return (
                                                    <li key={category.id} className="mb-5 flex justify-between items-center transition-all hover:text-orange">
                                                        <input
                                                            type="checkbox"
                                                            className="absolute w-5 h-5 bg-white border-2 border-gray-300 rounded cursor-pointer"
                                                            name={`chk-${category.id}`}
                                                            id={`chk-${category.id}`}
                                                        />
                                                        <label htmlFor={`chk-${category.id}`} className="cursor-pointer ml-9">
                                                            {category.name}
                                                        </label>
                                                    </li>
                                                );
                                            }
                                            return null; 
                                        })}
                                    </ul>
                                </div>
                                <div className="mb-12">
                                    <h4 className="font-medium text-md lg:text-lg text-dark capitalize mb-8">Female</h4>
                                    <ul>
                                        {productCategories.map((category) => {
                                            if (category.gender === "female") {
                                                return (
                                                    <li key={category.id} className="mb-5 flex justify-between items-center transition-all hover:text-orange">
                                                        <input
                                                            type="checkbox"
                                                            className="absolute w-5 h-5 bg-white border-2 border-gray-300 rounded cursor-pointer"
                                                            name={`chk-${category.id}`}
                                                            id={`chk-${category.id}`}
                                                        />
                                                        <label htmlFor={`chk-${category.id}`} className="cursor-pointer ml-9">
                                                            {category.name}
                                                        </label>
                                                    </li>
                                                );
                                            }
                                            return null; 
                                        })}
                                    </ul>
                                </div>

                            </div>
                        </div>


                        <div id="shoptab" className="ml-12">
                            <div className="-mt-14">
                                <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
                                    {products.slice(0, visibleProducts).map((product, index) => (
                                        <div key={index} className="relative group mb-12">

                                            <div className="relative overflow-hidden bg-cover ">
                                                <img
                                                    src={product.imgURL}
                                                    className="w-[224px] h-[336px] transition duration-700 ease-in-out hover:shadow-2xl hover:scale-110"
                                                    alt={product.name}
                                                    loading="lazy" />
                                            </div>

                                            <div className="opacity-0 group-hover:opacity-100 absolute top-4 right-[0.1rem] flex items-center transition-opacity duration-300">
                                                <button>
                                                    <div className="bg-gray-300 text-white p-2 text-xl">
                                                        <img src={cart} alt="" className="w-5" />
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 absolute top-14 right-[0.1rem] flex items-center transition-opacity duration-300">
                                                <button>
                                                    <div className="bg-gray-300 text-white p-2 text-xl">
                                                        <img src={heart} alt="" className="w-5" />
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="mt-8 flex justify-start gap-2.5">
                                                <img src={star} alt="rating icon" width={24} height={24} />
                                                <p className="font-montserrat text-xl leading-normal text-slate-gray">
                                                    (4.5)
                                                </p>
                                            </div>
                                            <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
                                                {product.name}
                                            </h3>
                                            <p className="mt-2 font-semibold font-montserrat text-navy-blue text-2xl leading-normal">
                                                {product.price}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                {visibleProducts < products.length && (
                                    <div className="flex justify-center mt-4 mb-5">
                                        <Button label="Load more" onClick={loadMore} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;

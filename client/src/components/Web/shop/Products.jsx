import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import Button from "../hooks/Button";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


const Products = () => {
    const [visibleProducts, setVisibleProducts] = useState(12);
    const [productCategories, setProductCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [reviews, setReviews] = useState([]);

    const calculateAverageRating = (product) => {
        const productReviews = reviews.filter(review => review.productId === product._id);

        const ratingCount = productReviews.length;

        if (ratingCount === 0) {
            return { averageRating: 0, ratingCount: 0 };
        }

        const totalRating = productReviews.reduce((total, review) => total + review.rating, 0);
        const averageRating = totalRating / ratingCount;

        const fullStars = Math.floor(averageRating);

        const hasHalfStar = averageRating - fullStars >= 0.1;

        return { averageRating, ratingCount, fullStars, hasHalfStar };
    };

    useEffect(() => {
        axios.get(`${window.react_app_url + window.review_url}`)
            .then(result => {
                setReviews(result.data.data);
            })
            .catch(err => console.log(err))
    }, []);

    
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cart-items");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const toggleFavorite = (productId) => {
        const isFavorite = favorites.includes(productId);

        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter((id) => id !== productId);
        } else {
            updatedFavorites = [...favorites, productId];
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    const toggleCartItems = (productId) => {
        const isCartItem = cartItems.includes(productId);

        let updatedCartItems;

        if (isCartItem) {
            updatedCartItems = cartItems.filter((id) => id !== productId);
        } else {
            updatedCartItems = [...cartItems, productId];
        }

        localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    useEffect(() => {
        axios.get(`${window.react_app_url + window.product_category_url}`)
            .then(result => {
                setProductCategories(result.data.data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get(`${window.react_app_url + window.product_url}`)
            .then(result => {
                setProducts(result.data.data);
            })
            .catch(err => console.log(err))
    }, []);

    const loadMore = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
    };

    return (
        <>
            <div className="p-20 pt-16 font-montserrat bg-slate-100">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

                        {/* Filter Checkboxes */}
                        <div className="lg:col-span-1 mt-8">
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
                                                    <li key={category._id} className="mb-5 flex justify-between items-center transition-all hover:text-orange">
                                                        <input
                                                            type="checkbox"
                                                            className="absolute w-5 h-5 bg-white border-2 border-gray-300 rounded cursor-pointer"
                                                            name={`chk-${category._id}`}
                                                            id={`chk-${category._id}`}
                                                        />
                                                        <label htmlFor={`chk-${category._id}`} className="cursor-pointer ml-9 text-sm uppercase">
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
                                                    <li key={category._id} className="mb-5 flex justify-between items-center transition-all hover:text-orange">
                                                        <input
                                                            type="checkbox"
                                                            className="absolute w-5 h-5 bg-white border-2 border-gray-300 rounded cursor-pointer"
                                                            name={`chk-${category._id}`}
                                                            id={`chk-${category._id}`}
                                                        />
                                                        <label htmlFor={`chk-${category._id}`} className="cursor-pointer ml-9 text-sm uppercase">
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

                        {/* Products List */}
                        <div id="shoptab" className="lg:col-span-4 ml-12">
                            <div className="-mt-14">
                                <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
                                    {products.slice(0, visibleProducts).map((product) => (
                                        <div key={product._id} className="relative group mb-12">
                                            <div className="relative overflow-hidden bg-cover">
                                                <img
                                                    src={`http://localhost:3000/public/images/products/${product.productimg}`}
                                                    className="w-[224px] h-[336px] transition duration-700 ease-in-out hover:shadow-2xl hover:scale-110"
                                                    alt={product.name}
                                                    loading="lazy" />
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 absolute top-4 right-[0.1rem] flex items-center transition-opacity duration-300" onClick={() => toggleCartItems(product._id)}>
                                                <button>
                                                    <div className="bg-gray-300 text-white p-2 text-xl">
                                                        {cartItems.includes(product._id) ? <BsFillCartCheckFill className="w-5" /> : <BsCartPlusFill className="w-5" />}                                                    </div>
                                                </button>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 absolute top-14 right-[0.1rem] flex items-center transition-opacity duration-300" onClick={() => toggleFavorite(product._id)}>
                                                <button>
                                                    <div className="bg-gray-300 text-white p-2 text-xl">
                                                        {favorites.includes(product._id) ? <AiFillHeart className="w-5" /> : <AiOutlineHeart className="w-5" />}
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="mt-8 flex justify-start gap-2.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star}>
                                                        {star <= calculateAverageRating(product).fullStars ? (
                                                            <AiFillStar className="text-xl text-yellow-500" />
                                                        ) : (
                                                            star === calculateAverageRating(product).fullStars + 1 && calculateAverageRating(product).hasHalfStar ? (
                                                                <FaStarHalfAlt className="text-xl text-yellow-500" />
                                                            ) : (
                                                                <AiOutlineStar className="text-xl text-yellow-500" />
                                                            )
                                                        )}
                                                    </span>
                                                ))}
                                                <span className="text-gray-400 text-xs ml-2">
                                                    ({calculateAverageRating(product).ratingCount} ratings)
                                                </span>
                                            </div>
                                            <h3 className="mt-2 text-sm leading-normal font-semibold font-palanquin">
                                                {product.name}
                                            </h3>
                                            <p className="mt-2 font-semibold font-montserrat text-navy-blue text-lg leading-normal">
                                                ₹ {product.price}.00
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

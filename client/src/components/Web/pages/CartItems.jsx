import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const [cartItemsIds, setCartItemsIds] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const handleQuantityChange = (productId, newQuantity) => {
        // Update the quantity for the specified product
        const updatedCartItems = cartItems.map((item) => {
            if (item._id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCartItems);

        // Calculate the subtotal based on updated quantities
        const subtotalAmount = updatedCartItems.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
        setSubtotal(subtotalAmount);

        // Update the local storage
        const updatedCartItemsIds = updatedCartItems.map((item) => item._id);
        localStorage.setItem('cart-items', JSON.stringify(updatedCartItemsIds));
    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cart-items');
        if (storedCartItems) {
            setCartItemsIds(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        axios
            .get(`${window.react_app_url + window.product_url}`)
            .then((result) => {
                const allProducts = result.data.data;

                const filteredCartItemProducts = allProducts.filter((product) =>
                    cartItemsIds.includes(product._id)
                );

                // Initialize quantities for each cart item
                const cartItemsWithQuantities = filteredCartItemProducts.map((item) => ({
                    ...item,
                    quantity: 1,
                }));

                setCartItems(cartItemsWithQuantities);

                // Calculate the subtotal based on initial quantities
                const subtotalAmount = cartItemsWithQuantities.reduce(
                    (total, product) => total + product.price * product.quantity,
                    0
                );
                setSubtotal(subtotalAmount);
            })
            .catch((err) => console.log(err));
    }, [cartItemsIds]);

    const removeCartItem = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item._id !== productId);
        setCartItems(updatedCartItems);

        const updatedCartItemsIds = updatedCartItems.map((item) => item._id);
        localStorage.setItem('cart-items', JSON.stringify(updatedCartItemsIds));
    };

    return (
        <div className="py-16 bg-gray-100 font-montserrat">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto justify-center px-9 space-x-4 flex">
                <div>
                    {cartItems.length === 0 ? (
                        <p>
                            No favorite products found.
                            <Link to="/products">
                                <span className="text-blue-600 hover:underline">
                                    {' '}
                                    Want to add ?
                                </span>
                            </Link>
                        </p>
                    ) : (
                        cartItems.map((product) => (
                            <div className="rounded-lg" key={product._id}>
                                <div className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                    <img
                                        src={`http://localhost:3000/public/images/products/${product.productimg}`}
                                        alt="product-image"
                                        className="w-32 h-32 rounded-lg"
                                    />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">
                                                {product.name}
                                            </h2>
                                            <p className="mt-1 text-md text-gray-700">
                                                Rs. {product.price}.00
                                            </p>
                                            <div className="mt-12 cursor-pointer">
                                                <div
                                                    className="text-sm hover:underline"
                                                    onClick={() => removeCartItem(product._id)}
                                                >
                                                    Remove Item
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-24 ml-12">
                                            <div className="flex flex-col">
                                                <div>
                                                    <span
                                                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-blue-500"
                                                        onClick={() => {
                                                            if (product.quantity > 1) {
                                                                handleQuantityChange(
                                                                    product._id,
                                                                    product.quantity - 1
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        className="h-8 w-8 bg-white text-center text-xs outline-none border-none"
                                                        type="text"
                                                        value={product.quantity}
                                                        onChange={(e) =>
                                                            handleQuantityChange(product._id, e.target.value)
                                                        }
                                                        min="1"
                                                        readOnly
                                                    />
                                                    <span
                                                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-500"
                                                        onClick={() => {
                                                            handleQuantityChange(
                                                                product._id,
                                                                product.quantity + 1
                                                            );
                                                        }}
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-[20%]">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">Rs. {subtotal}.00</p>
                        </div>
                        <div className="mt-12">
                            <button className="bg-black w-full px-5 py-1 text-white hover:text-blue-500">
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartItems;

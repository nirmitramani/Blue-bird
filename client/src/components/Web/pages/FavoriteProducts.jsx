import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FavoriteProducts = () => {
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Load favorite product IDs from local storage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavoriteProductIds(JSON.parse(storedFavorites));
    }
  }, []);

  // Fetch product data from the server and filter by favorite product IDs
  useEffect(() => {
    axios.get(`${window.react_app_url + window.product_url}`)
      .then(result => {
        const allProducts = result.data.data;

        // Filter products based on favoriteProductIds
        const filteredFavoriteProducts = allProducts.filter(product => favoriteProductIds.includes(product._id));

        setFavoriteProducts(filteredFavoriteProducts);
      })
      .catch(err => console.log(err));
  }, [favoriteProductIds]);


  const removeFavorite = (productId) => {
    const updatedFavorites = favoriteProductIds.filter((id) => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteProductIds(updatedFavorites);
  };

  return (
    <div className="py-16 bg-gray-100 font-montserrat">
      <h1 className="mb-10 text-center text-2xl font-bold">Favorite Items</h1>
      <div className="mx-auto justify-center md:flex px-9 space-x-4">
        {favoriteProducts.length === 0 ? (
          <p>
            No favorite products found.
            <Link to="/products">
              <span className="text-blue-600 hover:underline"> Want to add ?</span>
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {favoriteProducts.map((product) => (
              <div className="rounded-lg" key={product._id}>
                <div className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={`http://localhost:3000/public/images/products/${product.productimg}`}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                      <p className="mt-1 text-md text-gray-700"> ₹ {product.price}.00</p>
                      <p className="mt-1 text-sm text-gray-700">
                        {product.description.length > 20 ? (
                          <span>
                            {product.description.substring(0, 200)}... <br />
                          </span>
                        ) : (
                          product.description
                        )}
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="ml-32 -mt-4" onClick={() => removeFavorite(product._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="mt-48 ml-4">
                        <button className="bg-black px-5 py-1 text-white hover:text-blue-500">
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteProducts;

import React, { useState, useEffect } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

SwiperCore.use([Navigation]);
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rate, setRate] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleRatingClick = (givenRating) => {
    setRate(givenRating);
  };

  useEffect(() => {
    axios.get(`${window.react_app_url + window.product_url}/${id}`)
      .then(result => {
        console.log(`${window.react_app_url + window.product_url}/${id}`)
        setProduct(result.data.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, []);


  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
  };

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
    if (swiperInstance) {
      const realIndex = swiperInstance.realIndex;
      setActiveSlideIndex(realIndex);
    }
  }, [swiperInstance]);

  const handleThumbnailClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  const handleColorChange = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    }
    else {
      setSelectedColor(color);
    }
  };
  const colorCodes = ["#FFC0CB", "#778899", "#000080", "#D5D6EA"];

  return (
    <section className="sec-product-detail bg-gray-100 py-8 font-montserrat">
      <div className="mx-10">
        <div className="lg:flex">
          <div className="lg:w-2/3 p-6 flex">
            <div className="w-[11.111111%] mr-5">
              <ul className="slick3-dots" role="tablist">
                {product.productthumbimg.map((thumbimg, index) => (
                  <li
                    key={index}
                    className={`block relative w-full mb-[27px] ${activeSlideIndex === index ? 'border-[#c64646]' : ''}`}
                    role="presentation"
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img src={`http://localhost:3000/public/images/products/${thumbimg}`} alt=""
                      className="w-full shadow-lg"
                    />
                    <div
                      className={`absolute w-full h-full cursor-pointer transition-all duration-[0.4s] border-2 border-solid border-transparent left-0 top-0 ${activeSlideIndex === index ? 'border-[#c64646]' : ''}`}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[604px] h-[906px]">
              <Swiper
                navigation={true}
                onSlideChange={handleSlideChange}
                loop={true}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
              >
                {product.productthumbimg.map((thumbimg, index) => (
                  <SwiperSlide key={index}>
                    <img src={`http://localhost:3000/public/images/products/${thumbimg}`}
                      alt=""
                      className="shadow-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>


          <div className="lg:w-1/2 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <div className="mt-2 flex justify-start gap-1">
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

            <p className="text-lg text-gray-700 mt-4">Rs. {product.price}.00</p>
            <p className="text-sm text-gray-700 mt-1">(incl. of all taxes)</p>

            <div className='py-3'>
              <hr />
            </div>

            <div className="mb-4">
              <label htmlFor="size" className="block text-gray-700 font-medium text-sm">
                Size
              </label>
              <div className="product__details__option__size flex flex-row items-center mt-3">
                <ul className="grid grid-cols-4 gap-2">
                  {["S", "M", "L", "XL"].map((size, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        id={`size-${size}`}
                        name="size"
                        value={size}
                        className="hidden peer"
                        required
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="inline-flex items-center justify-center w-12 h-12 p-3 text-black bg-white cursor-pointer peer-checked:bg-black peer-checked:text-white hover:bg-gray-50 text-lg"
                      >
                        {size}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className='py-3'>
              <hr />
            </div>

            <div className="mb-6">
              <label htmlFor="color" className="block text-gray-700 font-medium text-sm">
                Color
              </label>
              <div className="flex flex-row items-center mt-3">
                <ul className="grid grid-cols-4 gap-2">
                  {colorCodes.map((color, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`color-${color}`}
                        value={color}
                        className="hidden peer"
                        checked={selectedColor === color}
                        onChange={() => handleColorChange(color)}
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className={`inline-flex w-12 h-12 p-3 text-gray-500 border-2 border-gray-200 ${selectedColor === color
                          ? `peer-checked:border-black`
                          : `hover:border-black`
                          } cursor-pointer text-lg`}
                        style={{ backgroundColor: color }}
                      ></label>

                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className='py-3'>
              <hr />
            </div>

            <div className="">
              <label htmlFor="quantity" className="block text-gray-700 font-medium text-sm">
                Quantity
              </label>
              <div className="flex flex-col mt-3">
                <div className='space-x-3'>
                  <span
                    className="cursor-pointer rounded-md bg-gray-300 py-2.5 px-5 duration-100 hover:bg-black hover:text-white"
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
                    className="h-10 w-10 bg-white text-center text-xs outline-none border"
                    type="text"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(product._id, e.target.value)
                    }
                    min="1"
                    readOnly
                  />
                  <span
                    className="cursor-pointer rounded-md bg-gray-300 py-2.5 px-5 duration-100 hover:bg-black hover:text-white"
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

            <div className='py-3'>
              <hr />
            </div>

            <button
              className="justify-center flex w-full py-3 text-center text-white bg-black hover:text-blue-700 uppercase space-x-3 text-sm"
            >
              <div className='text-lg'>
                <BsCartPlusFill />
              </div>
              <div>
                Add to cart
              </div>
            </button>
            <button
              className="justify-center flex mt-3 w-full py-3 text-center text-white bg-black hover:text-blue-700 uppercase space-x-3 text-sm"
            >
              <div className='text-lg'>
                <AiFillHeart />
              </div>
              <div>
                Add to wishlist
              </div>
            </button>
            <div className='py-3'>
              <hr />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-gray-700 font-medium">
                Give ratings to this product
              </label>
              <form>
                <div className="w-full mt-2 mb-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 bg-white dark:bg-gray-800">
                    <textarea id="comment" rows="9" className="w-full px-0 text-sm text-gray-900 bg-white border-none outline-none dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a review..." required></textarea>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <div className="flex pl-0 space-x-1 sm:pl-2">
                      {[...Array(5)].map((item, index) => {
                        const givenRating = index + 1;
                        return (
                          <label
                            key={index}
                            className="cursor-pointer"
                            onClick={() => handleRatingClick(givenRating)}
                          >
                            <input type="radio" className="hidden" />
                            <div className="text-xl">
                              <FaStar
                                className={
                                  givenRating <= rate
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                }
                              />
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black hover:text-blue-500 uppercase">
                      Post review
                    </button>
                  </div>
                </div>
              </form>
              <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should. </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-6 mt-8">
          <ul className="flex p-2">
            <li className="flex-1">
              <a
                href="#description"
                className="block py-2 text-center text-gray-700 border-b-2 border-blue-500 hover:text-blue-500"
              >
                Description
              </a>
            </li>
          </ul>
          <div className="p-4">
            <div id="description">
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-6 mt-8">
          <p className="text-gray-600">
            SKU: JAK-01
          </p>
          <p className="text-gray-600">
            Categories: Jacket, Men
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
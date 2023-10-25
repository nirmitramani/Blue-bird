import React, { useState, useEffect } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { product1, product2, product3 } from '../../../assets/images';

SwiperCore.use([Navigation]);

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ProductDetail = () => {
  const images = [
    product1,
    product2,
    product3,
  ];

  // Define state to manage the quantity field
  const [quantity, setQuantity] = useState(1);

  // Define a function to handle changes in the quantity field
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex;
    setActiveSlideIndex(realIndex);
  };

  useEffect(() => {
    if (swiperInstance) {
      const realIndex = swiperInstance.realIndex;
      setActiveSlideIndex(realIndex);
    }
  }, [swiperInstance]);

  const handleThumbnailClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index); // Set the active slide when a thumbnail is clicked
    }
  };

  return (
    <section className="sec-product-detail bg-gray-100 py-8">
      <div className="mx-10">
        <div className="lg:flex">
          <div className="lg:w-2/3 p-6 flex">
            <div className="w-[11.111111%] mr-5">
              <ul className="slick3-dots" role="tablist">
                {images.map((image, index) => (
                  <li
                    key={index}
                    className={`block relative w-full mb-[27px] ${activeSlideIndex === index ? 'border-[#c64646]' : ''
                      }`}
                    role="presentation"
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img className="w-full" src={image} alt="" />
                    <div
                      className={`absolute w-full h-full cursor-pointer transition-all duration-[0.4s] border-2 border-solid border-transparent left-0 top-0 ${activeSlideIndex === index ? 'border-[#c64646]' : ''
                        }`}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[800px]">
              <Swiper
                navigation={true}
                onSlideChange={handleSlideChange}
                loop={true}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-[550px]">
                      <img src={image} alt="" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="lg:w-1/3 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Lightweight Jacket
            </h2>
            <p className="text-lg text-gray-700 mb-4">$58.79</p>
            <p className="text-gray-600 mb-6">
              Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
              ligula. Mauris consequat ornare feugiat.
            </p>
            {/* Size Selector */}
            <div className="mb-4">
              <label htmlFor="size" className="block text-gray-700 font-medium">
                Size
              </label>
              <div className="product__details__option__size flex flex-row items-center">
                <ul className="grid grid-cols-4 gap-2">
                  {["s", "m", "l", "xl"].map((size, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`size-${size}`} value={size} className="hidden peer" required />
                      <label
                        htmlFor={`size-${size}`}
                        className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-3xl cursor-pointer dark:hover:text-gray-300 dark:border-gray-400 peer-checked:bg-gray-400 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-200 dark:hover:bg-gray-400 text-lg"
                      >
                        {size}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Color Selector */}
            <div className="mb-6">
              <label htmlFor="color" className="block text-gray-700 font-medium">
                Color
              </label>
              <div className="product__details__option__color flex flex-row items-center">
                <ul className="grid grid-cols-4 gap-2">
                  {["red", "sky", "green", "orange"].map((color, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`color-${color}`}
                        value={color}
                        className="hidden peer"
                        required
                        // onChange={(event) => handleCheckboxChange(event, color)}
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className={`color-label inline-flex items-center justify-center w-12 h-12 p-3 text-gray-500 bg-${color}-500 border-2 border-gray-200 peer-checked:border-blue-600 rounded-3xl cursor-pointer hover:border-blue-600 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-${color}-400 text-lg`}
                      >
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-gray-700 font-medium">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="px-3 py-2 mr-2 text-gray-600 bg-gray-200 border rounded-md focus:outline-none hover:bg-gray-300 transition duration-300"
                  onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                >
                  <span className="text-xl">-</span>
                </button>
                <input
                  type="tel"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-t border-b border-gray-200 rounded-md focus:outline-none appearance-none"
                  readOnly
                />
                <button
                  type="button"
                  className="px-3 py-2 ml-2 text-gray-600 bg-gray-200 border rounded-md focus:outline-none hover:bg-gray-300 transition duration-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>
            {/* Add to Cart Button */}
            <button
              className="block w-full py-3 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* Product Information Tabs */}
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
                Aenean sit amet gravida nisi. Nam fermentum est felis, quis
                feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque
                luctus dui at ante aliquet, in hendrerit lectus interdum.
                Morbi elementum sapien rhoncus pretium maximus. Nulla lectus
                enim, cursus et elementum sed, sodales vitae eros. Ut ex quam,
                porta consequat interdum in, faucibus eu velit. Quisque rhoncus
                ex ac libero varius molestie. Aenean tempor sit amet orci nec
                iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc
                nec laoreet consequat, purus nunc porta lacus, vel efficitur
                tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis.
                Nulla non tempor erat. Duis in egestas nunc.
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

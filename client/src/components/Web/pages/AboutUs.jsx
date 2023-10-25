import React from 'react'
import { shoe8 } from "../../../assets/images";
import Button from "../hooks/Button";

const AboutUs = () => {
  return (
    <>
      <section
        id="about-us"
        className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
      >
        <div className="flex flex-1 flex-col ml-16">
          <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-bold">
            We Provide You
            <span className="text-navy-blue"> Super </span>
            <span className="text-navy-blue">Quality </span> Shoes
          </h2>
          <p className="mt-4 lg:max-w-lg info-text">
            Ensuring premium comfort and style, our meticulously crafted footwear
            is designed to elevate your experience, providing you with unmatched
            quality, innovation, and a touch of elegance.
          </p>
          <p className="mt-6 lg:max-w-lg info-text">
            Our dedication to detail and excellence ensures your satisfaction
          </p>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img
            src={shoe8}
            alt="product detail"
            width={570}
            height={522}
            className="object-contain"
          />
        </div>
      </section>
      <section
        id="about-us"
        className="flex mt-20 justify-between items-center max-lg:flex-col gap-10 w-full max-container"
      >
        <div className="flex-1 flex justify-center items-center mb-5">
          <img
            src={shoe8}
            alt="product detail"
            width={570}
            height={522}
            className="object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col ml-16">
          <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-bold">
            We Provide You
            <span className="text-navy-blue"> Super </span>
            <span className="text-navy-blue">Quality </span> Shoes
          </h2>
          <p className="mt-4 lg:max-w-lg info-text">
            Ensuring premium comfort and style, our meticulously crafted footwear
            is designed to elevate your experience, providing you with unmatched
            quality, innovation, and a touch of elegance.
          </p>
          <p className="mt-6 lg:max-w-lg info-text">
            Our dedication to detail and excellence ensures your satisfaction
          </p>
        </div>
      </section>
    </>
  )
}

export default AboutUs
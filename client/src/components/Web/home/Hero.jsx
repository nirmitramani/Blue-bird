import React, { useEffect, useState } from "react";
import Button from "../hooks/Button";
import { arrowRight } from "../../../assets/icons";
import PopularProducts from "./PopularProducts";
import SuperQuality from "./SuperbQuality";
import SpecialOffer from "./SpecialOffer";
import CustomerReviews from "./CustomerReview";
import axios from "axios";

const Hero = () => {
  const [boxImg, setBoxImg] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShoeClick = (images) => {
    if (boxImg !== images) {
      setBoxImg(images);
    }
  };

  const statistics = [
    { value: "1k+", label: "Brands" },
    { value: "500+", label: "Shops" },
    { value: "250k+", label: "Customers" },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${window.react_app_url + window.slider_url}`);
        const activeImages = response.data.data.filter((image) => image.status === "Active");

        setImages(activeImages);

        if (activeImages.length > 0) {
          setBoxImg(activeImages[0].sliderimg);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <section className="xl:padding-l wide:padding-r padding-b">
        <section
          id="home"
          className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
        >
          <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28">
            <p className="text-xl font-montserrat text-navy-blue">
              Our Summer collections
            </p>

            <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
              <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
                The New Arrival
              </span>
              <br />
              <span className="text-navy-blue inline-block mt-3">Bluebird</span>
              <br /> Cloths
            </h1>
            <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
              Discover stylish Nike arrivals, quality comfort, and innovation for
              your active life.
            </p>

            <Button label="Shop now" iconURL={arrowRight} />

            <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
              {statistics.map((stat, index) => (
                <div key={index}>
                  <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
                  <p className="leading-7 font-montserrat text-slate-gray">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <img
                src={`http://localhost:3000/public/images/slider/${boxImg}`}
                alt="images collection"
                width={610}
                height={502}
                className="object-contain relative z-10"
              />
            )}
            <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6 z-10">
              {images.map((image, index) => (
                <div key={index}>
                  <div
                    className={`border-2 rounded-xl ${boxImg === image.sliderimg
                      ? "border-navy-blue"
                      : "border-transparent"
                      } cursor-pointer max-sm:flex-1`}
                    onClick={() => handleShoeClick(image.sliderimg)}
                  >
                    <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
                      <img
                        src={`http://localhost:3000/public/images/slider/${image.sliderimg}`}
                        alt="images collection"
                        width={127}
                        height={100.34}
                        className="object-contain h-36 mt-3"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <SuperQuality />
      </section>
      <section className="padding">
        <SpecialOffer />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
    </>
  );
};

export default Hero;
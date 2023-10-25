import { star, cart, heart } from "../../../assets/icons";
import {
  shoe4,
  shoe5,
  shoe6,
  shoe7,
} from "../../../assets/images";
import Button from "../hooks/Button";
import { Link } from "react-router-dom";
import ManImage1 from "../../../assets/images/m-bistic-3.jpg"
import ManImage2 from "../../../assets/images/m-black-1.jpg"
import ManImage3 from "../../../assets/images/m-neviblue-1.jpg"

const PopularProducts = () => {
  const products = [
    {
      imgURL: ManImage1,
      name: "Nike Air Jordan-01",
      price: "$200.20",
    },
    {
      imgURL: ManImage3,
      name: "Nike Air Jordan-10",
      price: "$210.20",
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
  ];

  return (
    <>

      <section id="products" className="max-container max-sm:mt-12 ml-[5rem]">
        <div className="flex flex-col justify-start gap-5">
          <h2 className="text-4xl font-palanquin font-bold">
            Our <span className="text-navy-blue"> Popular </span> Products
          </h2>
          <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
            Experience top-notch quality and style with our sought-after
            selections. Discover a world of comfort, design, and value
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
          {products.map((product ,index) => (
            <div key={index} className="relative group mb-12">

              <div className="relative overflow-hidden bg-cover ">
                <img
                  src={product.imgURL}
                  className="w-[224px] h-[336px] transition duration-700 ease-in-out hover:shadow-2xl hover:scale-110"
                  alt={product.name}
                  loading="lazy" />
              </div>

              <div className="opacity-0 group-hover:opacity-100 absolute top-4 right-[4.9rem] flex items-center transition-opacity duration-300">
                <button>
                  <div className="bg-gray-300 text-white p-2 text-xl">
                    <img src={cart} alt="" className="w-5" />
                  </div>
                </button>
              </div>
              <div className="opacity-0 group-hover:opacity-100 absolute top-14 right-[4.9rem] flex items-center transition-opacity duration-300">
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
      </section>
      <div className="flex justify-center mt-12">
        <Link to="/products">
          <Button label="Show all Product" />
        </Link>
      </div>
    </>
  );
};

export default PopularProducts;

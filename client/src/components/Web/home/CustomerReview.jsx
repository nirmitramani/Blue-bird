import { star } from "../../../assets/icons";
import {
  customer1,
  customer2,
} from "../../../assets/images";

const CustomerReviews = () => {
  const reviews = [
    {
      imgURL: customer1,
      customerName: "Morich Brown",
      rating: 4.5,
      feedback:
        "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
    },
    {
      imgURL: customer2,
      customerName: "Lota Mongeskar",
      rating: 4.5,
      feedback:
        "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
    },
  ];

  return (
    <section className="max-container">
      <h3 className="font-palanquin text-center text-4xl font-bold">
        What Our
        <span className="text-navy-blue"> Customers </span>
        Say?
      </h3>
      <p className="m-auto mt-4 max-w-lg  text-center info-text">
        Hear genuine stories from our satisfied customers about their
        exceptional experiences with us.
      </p>

      <div className="mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14">
        {reviews.map((review, index) => (
          <div key={index} className="flex justify-center items-center flex-col">
            <img
              src={review.imgURL}
              alt="customer"
              className="rounded-full object-cover w-[120px] h-[120px]"
            />
            <p className="mt-6 max-w-sm text-center info-text">{review.feedback}</p>
            <div className="mt-3 flex justify-center items-center gap-2.5">
              <img
                src={star}
                width={24}
                height={24}
                alt="rating star"
                className="object-contain m-0"
              />
              <p className="text-xl font-montserrat text-slate-gray">({review.rating})</p>
            </div>
            <h3 className="mt-1 font-palanquin text-3xl text-center font-bold">
              {review.customerName}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;

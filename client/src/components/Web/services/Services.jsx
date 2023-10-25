import {
  shieldTick,
  support,
  truckFast,
  twitter,
} from "../../../assets/icons";

const Services = () => {
  const services = [
    {
      imgURL: truckFast,
      label: "Free shipping",
      subtext: "Enjoy seamless shopping with our complimentary shipping service.",
    },
    {
      imgURL: shieldTick,
      label: "Secure Payment",
      subtext:
        "Experience worry-free transactions with our secure payment options.",
    },
    {
      imgURL: support,
      label: "Love to help you",
      subtext: "Our dedicated team is here to assist you every step of the way.",
    },
  ];

  return (
    <section className="padding-x py-10">
      <section className="max-container flex justify-center flex-wrap gap-9">
        {services.map((service) => (
          <div key={service.label} className="flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16">
            <div className="w-11 h-11 flex justify-center items-center bg-navy-blue rounded-full">
              <img src={service.imgURL} alt={service.label} width={24} height={24} />
            </div>
            <h3 className="mt-5 font-palanquin text-3xl leading-normal font-bold">
              {service.label}
            </h3>
            <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray">
              {service.subtext}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Services;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const OurSponsors = () => {
  const logos = [
    {
      name: "NRB",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Seal_of_the_Nepal_Rastra_Bank.jpg",
    },

    {
      name: "NIC",
      imageUrl:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a7/5c/7a/a75c7aa6-af62-cca0-6117-02d8ac4435b0/AppIcon-0-0-1x_U007emarketing-0-6-0-0-85-220.png/512x512bb.jpg",
    },
    {
      name: "Deprosc",
      imageUrl:
        "https://play-lh.googleusercontent.com/wC_z0UJ-peI_vnE0IFUlLvbV3mMEcxwr6xbnrLhuDxIYRgRUT4HU46Ue9VYM3puYjE8=w240-h480-rw",
    },
    {
      name: "Mahuli",
      imageUrl: "https://mslbsl.com.np/images/logo.png",
    },
    {
      name: "Forward",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_l28eISorl_lFtoi8_-Nf0QtOifrATEtgNjjBVVv6Mo6s0PCz_PO6H8B4oYWHsYI38Y&usqp=CAU",
    },
    {
      name: "SWBBL",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMlTCw_BO35RqD9Hli4VvOP6PHdaBNmTQDSw&s",
    },
    {
      name: "BGMCL",
      imageUrl: "https://csdnepal.org.np/app/webroot/upload/images/BGMCL.jpg",
    },
    {
      name: "Gurans",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhUZ8f3yuWmWybgcCL13iA-87Bwm-NpKGxw&s",
    },
    {
      name: "SKBBL",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbZu2roQgmSA8qaXCUaFQ5SD1i2Pb0R0Igvg&s",
    },
    {
      name: "NMB",
      imageUrl:
        "https://yt3.googleusercontent.com/66MAIe7FVClHq0hGdE1zrPvtjl7F3V6c1c6PNYjM-r0umv8r9-4WXLbX36fye_ILJ1BPZciLig=s900-c-k-c0x00ffffff-no-rj",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mt-10 px-4 md:px-10 lg:px-20 py-10">
      <h1 className="font-bold text-green-800 text-3xl text-center mb-2">
        Our Sponsors
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Our event is proudly sponsored by these esteemed organizations.
      </p>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        arrows={false}
      >
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center p-2">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-2 flex items-center justify-center w-25 h-25">
              <img
                src={logo.imageUrl}
                alt={logo.name}
                className="max-h-24 max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default OurSponsors;

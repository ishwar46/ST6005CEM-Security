import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OurSponsors from "../../components/OurSponsers";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../css/homepage.css";
import { Link } from "react-router-dom";
import cover1 from "../../assets/images/mountev.jpg";
import cover2 from "../../assets/images/pokhra.webp";
import cover3 from "../../assets/images/ktm.webp";

const HomePage = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const images = [cover1, cover2, cover3];

  return (
    <>
      <Navbar />
      <div className="relative h-[calc(100vh-112px)] overflow-hidden">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          arrows={false}
          className="h-full"
        >
          {images.map((image, index) => (
            <div key={index} className="h-full">
              <img
                src={image}
                className="object-cover w-full h-full"
                alt={`Conference Cover ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Asian Microfinance Summit 2024: Empowering Financial
            Inclusion
          </h1>
          <p className="text-xl mb-4">
            Join us in Nepal for the premier event dedicated to microfinance in
            Asia. This summit brings together industry leaders, policymakers,
            and practitioners to discuss strategies for financial inclusion,
            sustainable development, and economic empowerment. Network with
            peers, learn from experts, and explore innovative solutions that can
            drive growth and resilience in microfinance institutions across the
            region.
          </p>
          <Link to="/register">
            <button className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-full text-lg">
              Register Now
            </button>
          </Link>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center text-white">
          <span className="text-lg">20-25 December 2024</span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center text-white">
          <FaMapMarkerAlt className="text-2xl mr-2" />
          <span className="text-lg">Soltee Hotel, Kathmandu</span>
        </div>
      </div>

      <OurSponsors />

      <div className="bg-white p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-800">Follow Us</h2>
        <div className="flex justify-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-3xl"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-3xl"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 text-3xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="bg-[#3051A0] p-5 w-full">
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

import React from "react";
import Navbar from "../../components/Navbar";

const Accomodation = () => {
  return (
    <>
      <Navbar />
      <div className="Accomodation container px-5 mx-auto mt-10">
        <div
          className="text-3xl font-bold text-blue-800 pt-5 text-center"
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          Accommodation
        </div>
        <div
          className="mt-10 p-5 bg-white rounded-lg shadow-lg"
          style={{ animation: "fadeIn 2s ease-out" }}
        >
          <h2 className="text-2xl font-semibold text-green-800 mb-5 text-center">
            Soltee Hotel
          </h2>
          <p className="text-lg text-gray-700 mb-5 text-center">
            Kathmandu, Nepal
          </p>
          <div className="text-center">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/d3/30/81/caption.jpg?w=700&h=-1&s=1"
              alt="Soltee Hotel"
              className="mx-auto mb-5 rounded-lg"
              style={{ width: "50%", height: "auto" }}
            />
          </div>
          <p className="text-lg text-gray-700">
            Soltee Hotel in Kathmandu offers luxurious accommodations with
            world-class amenities. Enjoy your stay with elegant rooms, excellent
            dining options, and exceptional hospitality.
          </p>
          <p className="text-lg text-gray-700 mt-5">
            Address: Tahachal Marg, Kathmandu 44600, Nepal
          </p>
          <p className="text-lg text-gray-700">Phone: +977-1-4273999</p>
          <p className="text-lg text-gray-700">
            Website:{" "}
            <a
              href="https://www.solteehotel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              www.solteehotel.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Accomodation;

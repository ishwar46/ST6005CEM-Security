import React from "react";
import "../../css/animations.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useDocumentTitle from "../../components/DocTitle";

const AboutASIAN = () => {
  useDocumentTitle("About ASIAN - ASIAN Conference");

  return (
    <>
      <Navbar />
      <div className="container px-5 mx-auto mt-10 mb-10">
        <div
          className="text-3xl font-bold text-blue-800 pt-5 text-center mb-5"
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          ASIAN MICROFINANCE SUMMIT 2024
        </div>
        <div
          className="text-2xl font-semibold text-green-800 text-center mb-10"
          style={{ animation: "fadeIn 2s ease-out" }}
        >
          "Empowering Financial Inclusion Across Asia"
        </div>
        <section className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-5 cardSlideUp1">
          <h2 className="text-2xl font-bold text-green-700 mb-3">
            Overview of the Summit
          </h2>
          <p className="text-black text-lg">
            The Asian Microfinance Summit 2024 is a premier event dedicated to
            advancing financial inclusion and sustainable development in Asia.
            This summit brings together industry leaders, policymakers,
            practitioners, and innovators to discuss strategies and explore
            solutions that can drive growth and resilience in microfinance
            institutions across the region.
          </p>
        </section>
        <section className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-5 cardSlideUp2">
          <h2 className="text-2xl font-bold text-green-700 mt-5 mb-3">
            Summit Objectives
          </h2>
          <p className="text-black text-lg">
            The primary objectives of the Asian Microfinance Summit 2024 are to:
          </p>
          <ul className="list-disc pl-5 text-black text-lg">
            <li>
              Promote the sound development of microfinance systems in Asian
              countries.
            </li>
            <li>
              Facilitate the exchange of knowledge and best practices among
              industry stakeholders.
            </li>
            <li>
              Foster collaborations and partnerships to enhance financial
              inclusion.
            </li>
            <li>
              Highlight innovative solutions and technologies in the
              microfinance sector.
            </li>
          </ul>
        </section>
        <section className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-5 cardSlideUp3">
          <h2 className="text-2xl font-bold text-green-700 mt-5 mb-3">
            Key Information
          </h2>
          <div className="mb-5 text-black text-lg">
            <strong className="text-blue-800">Date:</strong>
            <p className="text-black text-lg">20-25 December 2024</p>
          </div>
          <div className="mb-5 text-black text-lg">
            <strong className="text-blue-800">Venue:</strong>
            <p className="text-black text-lg">Soltee Hotel, Kathmandu, Nepal</p>
          </div>
        </section>
        <section className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-5 cardSlideUp4">
          <h2 className="text-2xl font-bold text-green-700 mt-5 mb-3">
            Our Aim
          </h2>
          <p className="text-black text-lg">
            Our aim is to empower small businesses and entrepreneurs in Asia by
            providing them with the tools, knowledge, and support they need to
            thrive. Through this summit, we aim to create a platform where ideas
            can be exchanged, collaborations can be formed, and innovative
            solutions can be showcased, all with the goal of enhancing financial
            inclusion and sustainable economic development in the region.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutASIAN;

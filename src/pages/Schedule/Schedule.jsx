import React, { useState, useEffect } from "react";
import "../../css/animations.css";
import Navbar from "../../components/Navbar";
import scheduleData from "../../data/schedule";
import Footer from "../../components/Footer";
import logo from "../../assets/asian.png";

const Schedule = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  useEffect(() => {
    // Ensure Day 1 is selected by default when the component mounts
    setSelectedDayIndex(0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative container mx-auto px-4 mt-10 mb-10">
        <div
          className="absolute inset-0 flex justify-center items-center opacity-10 z-0"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.1,
          }}
        ></div>
        <div
          className="text-3xl font-bold text-blue-800 pt-5 text-center"
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          SUMMIT SCHEDULE
        </div>
        <div className="text-1xl font-bold text-green-800 text-center mb-10">
          Our event will be held on the following dates:
        </div>
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-8 mt-10">
          {scheduleData.map((day, index) => (
            <div
              key={index}
              onClick={() => setSelectedDayIndex(index)}
              className={`p-5 text-center shadow-md border transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer rounded-lg ${
                selectedDayIndex === index
                  ? "bg-green-800 text-white"
                  : "bg-white text-gray-800"
              } cardSlideUp`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-1xl font-bold">Day {index + 1}</div>
              <div>{day.date}</div>
            </div>
          ))}
        </div>
        {selectedDayIndex !== null && (
          <div className="mt-10 p-5 bg-white shadow-md border transition duration-500 ease-in-out border-1 border-gray-300 mb-10 rounded-lg">
            <div className="text-1xl font-bold text-blue-800 flex items-center">
              <span className="mr-2">📅</span>{" "}
              {scheduleData[selectedDayIndex].date}
            </div>
            {scheduleData[selectedDayIndex].events ? (
              <div className="grid md:grid-cols-1 grid-cols-1 gap-1 mt-10">
                {scheduleData[selectedDayIndex].events.map(
                  (event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="p-5 bg-white text-left transition duration-500 ease-in-out border-1 border-gray-300 flex items-center rounded-lg"
                    >
                      <i
                        className="fa fa-arrow-right mr-2"
                        aria-hidden="true"
                        style={{ fontSize: "24px", color: "black" }}
                      ></i>

                      <div className="text-1xl font-bold text-black">
                        {event}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-800 mt-2 font-bold">
                {scheduleData[selectedDayIndex].description ||
                  "Detailed timetable will be updated soon!"}
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Schedule;

import React from "react";
import Navbar from "../../components/Navbar";
import historyData from "./Historydata.json";
import Footer from "../../components/Footer";
import useDocumentTitle from "../../components/DocTitle";

const History = () => {
  useDocumentTitle("History of ASIAN - Asian Microfinance Summit Nepal");

  // Include the latest 10 entries, including the upcoming conference in Nepal
  const historyEntries = historyData.History.slice(0, 9).concat(
    historyData.History.find((entry) => entry.number === "11th")
  );

  return (
    <>
      <Navbar />
      <div className="text-3xl text-gray-900">
        <section>
          <div className="bg-white text-black py-8">
            <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
              <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
                <p className="font-bold text-green-700 uppercase tracking-loose">
                  History of Micro Summit
                </p>
                <p className="text-lg md:text-lg leading-normal md:leading-relaxed mb-2">
                  History of Micro Summit and Host Country
                </p>
              </div>
              <div className="ml-0 md:ml-12 lg:w-2/3">
                <div className="grid gap-6">
                  {historyEntries &&
                    historyEntries.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border-l-4 border-blue-600 p-4 shadow-lg rounded-lg"
                      >
                        <p className="text-base text-blue-700">{item.date}</p>
                        <h4 className="font-bold text-lg">
                          {Array.isArray(item.details)
                            ? item.details.join("; ")
                            : item.details}
                        </h4>
                        <p className="text-lg font-bold text-gray-700">
                          {item.host_country}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default History;

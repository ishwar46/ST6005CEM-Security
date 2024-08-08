import React from "react";
import logo from "../../assets/asian.png";
import ceo from "../../assets/images/cnc.jpg";
import chairman from "../../assets/images/pnc.jpg";
import "../../css/animations.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useDocumentTitle from "../../components/DocTitle";

const CeoMessage = () => {
  useDocumentTitle("Messages - ASIAN Conference");
  return (
    <>
      <Navbar />
      <div className="relative container mx-auto px-4 mt-10 mb-10">
        <div
          className="lg:text-3xl text-2xl font-bold text-blue-800 pt-5 text-center"
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          Message from CEO and Chairman
        </div>
        <div className="grid grid-cols-1 gap-10 mt-10">
          <div
            className="relative transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl bg-transparent shadow-xl rounded-lg lg:p-6 text-gray-900 text-justify text-sm"
            style={{ animation: "slideUp 0.5s ease-out" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${logo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "50%",
                backgroundPosition: "center",
                opacity: 0.1,
              }}
            />
            <p className="max-w-6xl mx-auto px-6 text-lg font-bold text-green-700">
              Message from the CEO and Chairman of Mahuli Laghubitta Bittiya
              Sanstha Ltd.
            </p>
            <div className="max-w-6xl mx-auto px-6 py-5">
              <h1 className="text-lg font-semibold mb-4">
                Dear Participants, A warm greetings!
              </h1>
              <p className="mb-2 text-lg">
                It is with great pleasure and pride that we send a warm welcome
                to all prominent visitors, experts, and delegates to the ASIAN
                Microfinance Summit 2024 with the theme "Empowering Financial
                Inclusion Across Asia," organized by Mahuli Laghubitta Bittiya
                Sanstha Ltd.
              </p>
              <p className="mb-2 text-lg">
                In the backdrop of the dynamic financial landscape of Asia, we
                recognize the vital role that microfinance institutions play in
                empowering individuals and fostering economic growth. Mahuli
                Laghubitta is committed to driving innovations in financial
                inclusion and supporting the growth of small businesses and
                entrepreneurs across the region.
              </p>
              <p className="mb-2 text-lg">
                The conference provides an invaluable platform for stakeholders
                to engage in meaningful discussions, share insights, and explore
                collaborative opportunities to enhance the impact of
                microfinance in Asia. We believe that through collective efforts
                and shared knowledge, we can overcome challenges and unlock new
                avenues for sustainable development.
              </p>
              <p className="mb-2 text-lg">
                Nepal extends a warm welcome to all of you with its rich
                cultural legacy. We remain steadfast in our commitment to
                fostering an atmosphere that encourages partnerships, sparks
                innovation, and drives sustainable economic growth. Let's embark
                on this journey of financial empowerment and economic
                transformation together throughout Asia. Together, we can unlock
                the full potential of the Asian microfinance sector and create a
                brighter future for generations to come.
              </p>
              <p className="mb-4 text-lg">Warm Regards,</p>
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="font-bold text-lg text-green-800">
                    Chandra Chaudhary <br />
                    Chief Executive Officer
                  </p>
                  <img
                    src={ceo}
                    alt="Chandra Chaudhary, CEO"
                    className="p-2 lg:w-[200px] lg:h-[200px] w-[100%] h-[100%] rounded-full"
                  />
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-green-800">
                    Prabhu N Chaudhary <br />
                    Chairman
                  </p>
                  <img
                    src={chairman}
                    alt="Prabhu N Chaudhary, Chairman"
                    className="p-2 lg:w-[200px] lg:h-[200px] rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CeoMessage;

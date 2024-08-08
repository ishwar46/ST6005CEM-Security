import React from "react";
import "../../css/animations.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useDocumentTitle from "../../components/DocTitle";

const SummitMembers = () => {
  useDocumentTitle("Summit Members - ASIAN Conference");

  const members = [
    {
      sn: 1,
      country: "Nepal",
      institution: "Mahuli Laghubitta Bittiya Sanstha Ltd.",
    },
    {
      sn: 2,
      country: "Nepal",
      institution: "Nirdhan Utthan Bank Limited",
    },
    {
      sn: 3,
      country: "Nepal",
      institution: "Mukti Microfinance Bittiya Sanstha Ltd.",
    },
    {
      sn: 4,
      country: "Nepal",
      institution: "Chhimek Microfinance Development Bank",
    },
    {
      sn: 5,
      country: "Nepal",
      institution: "Swabalamban Laghubitta Bittiya Sanstha Ltd.",
    },
    {
      sn: 6,
      country: "Nepal",
      institution: "Forward Microfinance Laghubitta Bittiya Sanstha Ltd.",
    },
    {
      sn: 7,
      country: "Nepal",
      institution: "Mero Microfinance Bittiya Sanstha Ltd.",
    },
    {
      sn: 8,
      country: "Nepal",
      institution: "Deprosc Laghubitta Bittiya Sanstha Ltd.",
    },
    {
      sn: 9,
      country: "Nepal",
      institution: "NMB Microfinance Bittiya Sanstha Ltd.",
    },
    {
      sn: 10,
      country: "Nepal",
      institution: "NIC Asia Bank",
    },
    {
      sn: 11,
      country: "Nepal",
      institution: "Bouddha Gramin Microfinance",
    },
    {
      sn: 12,
      country: "Bangladesh",
      institution: "Grameen Bank",
    },
    {
      sn: 13,
      country: "Bangladesh",
      institution: "BRAC",
    },
    {
      sn: 14,
      country: "India",
      institution: "SKS Microfinance",
    },
    {
      sn: 15,
      country: "India",
      institution: "Bandhan Bank",
    },
    {
      sn: 16,
      country: "Philippines",
      institution: "Card Bank Inc.",
    },
    {
      sn: 17,
      country: "Sri Lanka",
      institution: "Berendina Micro Investments Company Ltd.",
    },
    {
      sn: 18,
      country: "Thailand",
      institution: "Siam Microfinance",
    },
    {
      sn: 19,
      country: "Indonesia",
      institution: "Bank Rakyat Indonesia (BRI)",
    },
    {
      sn: 20,
      country: "Pakistan",
      institution: "Kashf Foundation",
    },
    {
      sn: 21,
      country: "Vietnam",
      institution: "TYM Fund",
    },
    {
      sn: 22,
      country: "Cambodia",
      institution: "AMK Microfinance Institution Plc.",
    },
    {
      sn: 23,
      country: "Myanmar",
      institution: "Pact Global Microfinance Fund",
    },
    {
      sn: 24,
      country: "China",
      institution:
        "China Foundation for Poverty Alleviation (CFPA) Microfinance",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container px-5 mx-auto mt-10 mb-20">
        <div
          className="text-3xl font-bold text-blue-800 pt-5 text-center mb-10"
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          SUMMIT MEMBERS
        </div>

        <table className="table-auto w-full text-left mb-8">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-4 py-2">SN</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Institution</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.sn}
                className="bg-white border-b text-green-800 hover:bg-blue-100 transition-colors duration-300"
              >
                <td className="px-4 py-2">{member.sn}</td>
                <td className="px-4 py-2">{member.country}</td>
                <td className="px-4 py-2">{member.institution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default SummitMembers;

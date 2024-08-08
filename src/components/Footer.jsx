import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import SuccessDialog from "./SuccessDialog";
import AlertDialog from "./AlertDialog";
import { addSubscriberApi } from "../apis/Api";

const Footer = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleFullnameChange = (event) => setFullname(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullname || !email || !message) {
      alert("All fields are required!");
      return;
    }

    const formData = { fullname, email, message };

    try {
      const response = await addSubscriberApi(formData);

      if (response.status === 200) {
        setSuccessOpen(true);
        setDialogMessage(
          "Thank you! We have received your query and will get back to you as soon as possible."
        );
        setFullname("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error(
          response.data.error ||
            "Unfortunately, we encountered a problem while processing your request. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorOpen(true);
      setDialogMessage(error.message);
    }
  };

  return (
    <>
      <div className="bg-[#3051A0] p-5 w-full mt-5">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between pt-5 gap-10">
          <div className="space-y-5">
            <div className="text-white text-2xl font-bold">
              Asian Microfinance Summit 2024
            </div>
            <div className="font-bold text-white">
              20th to 25th December, 2024
            </div>
            <div className="font-bold text-white">Kathmandu, Nepal</div>
            <div className="flex gap-2 items-center">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-6 w-6 hover:text-blue-500" />
              </a>
              <div className="text-white">
                <span className="text-green-500 cursor-pointer">
                  +977-9804704028
                </span>{" "}
                feel free to message for queries. (Chat Only)
              </div>
            </div>
            <div className="flex gap-4 text-white mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="h-6 w-6 hover:text-blue-500" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-6 w-6 hover:text-blue-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-6 w-6 hover:text-blue-700" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-6 w-6 hover:text-pink-500" />
              </a>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-white text-2xl font-bold">
                DO YOU HAVE ANY QUERIES?
              </div>
              <input
                type="text"
                value={fullname}
                onChange={handleFullnameChange}
                placeholder="Enter your Full Name"
                className="w-full p-3 rounded-lg text-sm text-black border border-transparent focus:border-white focus:ring-0"
              />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Your Email"
                className="w-full p-3 rounded-lg text-sm text-black border border-transparent focus:border-white focus:ring-0"
              />
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter your message"
                className="w-full p-3 min-h-[100px] rounded-lg text-sm text-black border border-transparent focus:border-white focus:ring-0"
              ></textarea>
              <button
                type="submit"
                className="h-10 px-5 text-white bg-green-700 w-full rounded-xl hover:bg-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <hr className="mt-10 border-gray-400" />
        <div className="text-center text-white mt-5">
          © 2024 Asian Microfinance Summit, All rights reserved.
        </div>
      </div>
      <SuccessDialog
        open={successOpen}
        setOpen={setSuccessOpen}
        title="Success"
        description={dialogMessage}
      />
      <AlertDialog
        open={errorOpen}
        setOpen={setErrorOpen}
        title="Error"
        description={dialogMessage}
      />
    </>
  );
};

export default Footer;

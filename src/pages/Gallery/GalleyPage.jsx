import React, { useEffect, useState } from "react";
import "../../css/animations.css";
import Navbar from "../../components/Navbar";
import { getAllImageinGalaryApi } from "../../apis/Api";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getAllImageinGalaryApi();
        console.log(response.data.gallery);
        if (response.data.success) {
          setGalleryImages(response.data.gallery);
        } else {
          toast.error("Error in fetching images");
        }
      } catch (error) {
        console.log(`Error Ferching Images ${error}`);
      }
    };
    fetchImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Navbar />
      <div
        className="container mx-auto px-4 mt-10"
        style={{ animation: "fadeIn 1s ease-out" }}
      ></div>
      <div
        className="text-3xl font-bold text-blue-800 pt-5 text-center "
        style={{ animation: "fadeIn 2s ease-out" }}
      >
        Gallery
      </div>
      <div
        className="text-1xl font-semibold text-green-800 text-center mb-10"
        style={{ animation: "fadeIn 2s ease-out" }}
      >
        Places to visit
      </div>
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                alt={image.alt}
                className="block w-full h-auto object-cover rounded-lg transition duration-500 transform hover:scale-110"
                src={
                  image.image
                    ? `https://api.acsicnepal.com/${image.image}`
                    : "https://via.placeholder.com/100"
                }
                style={{ aspectRatio: "1 / 1" }}
                loading="lazy"
              />
              <div
                onClick={() => openModal(image)}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
              >
                <p className="text-white text-lg px-4 text-center">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {selectedImage && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 h-1/2 my-6 mx-auto max-w-3xl  ">
              <div className="  border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    {selectedImage.title}
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-black">
                    {selectedImage.description}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default GallerySection;

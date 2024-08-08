import React, { useState, useEffect } from "react";
import useDocumentTitle from "../../components/DocTitle";
import {
  addSpeakerApi,
  getAllSpeakersApi,
  updateSpeakerApi,
  deleteSpeakerApi,
} from "../../apis/Api";
import toast from "react-hot-toast";

const AddSpeaker = () => {
  useDocumentTitle("Add Speakers - ACSIC Conference ");

  const [speakers, setSpeakers] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    designation: "",
    email: "",
    biography: "",
    image: null,
  });
  const [emailError, setEmailError] = useState("");
  const [editingSpeakerId, setEditingSpeakerId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      validateEmail(value);
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    const payload = new FormData();
    payload.append("fullName", formData.name);
    payload.append("institution", formData.companyName);
    payload.append("designation", formData.designation);
    payload.append("email", formData.email);
    payload.append("biography", formData.biography);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      if (editingSpeakerId) {
        await updateSpeakerApi(editingSpeakerId, payload);
        toast.success("Speaker updated successfully!");
        setEditingSpeakerId(null);
      } else {
        await addSpeakerApi(payload);
        toast.success("Speaker added successfully!");
      }
      fetchSpeakers();
    } catch (error) {
      toast.error(`Error ${editingSpeakerId ? "updating" : "adding"} speaker.`);
      console.error(
        `Error ${editingSpeakerId ? "updating" : "adding"} speaker:`,
        error
      );
    }
  };

  const fetchSpeakers = async () => {
    try {
      const response = await getAllSpeakersApi();
      setSpeakers(response.data.speakers);
    } catch (error) {
      toast.error("Error fetching speakers.");
      console.error("Error fetching speakers:", error);
    }
  };

  const toggleCollapse = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEdit = (speaker) => {
    setEditingSpeakerId(speaker._id);
    setFormData({
      name: speaker.name,
      companyName: speaker.companyName,
      designation: speaker.designation,
      email: speaker.email,
      biography: speaker.biography,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (speakerId) => {
    try {
      await deleteSpeakerApi(speakerId);
      toast.success("Speaker deleted successfully!");
      fetchSpeakers();
    } catch (error) {
      toast.error("Error deleting speaker.");
      console.error("Error deleting speaker:", error);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold text-start mb-4 text-black mt-2">
        {editingSpeakerId ? "Edit Speaker" : "Add Speaker"}
      </h2>
      <div className="w-full max bg-white p-5 rounded-lg shadow-lg mb-10">
        <form className="space-y-6 text-green-600 " onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Fullname of Speaker"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Institution
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Institution Name"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Designation"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Email"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700">
                Biography
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                rows="4"
                placeholder="Enter Biography"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            {editingSpeakerId ? "Update" : "Save"}
          </button>
        </form>
      </div>

      <div className="w-full max bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          List of Speakers
        </h2>
        <div className="space-y-6">
          {speakers.map((speaker) => (
            <div
              key={speaker._id}
              className="bg-white border border-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex items-center">
                <img
                  src={
                    speaker.image
                      ? `http://localhost:5000/${speaker.image}`
                      : "https://static.vecteezy.com/system/resources/previews/020/168/700/original/faceless-male-silhouette-empty-state-avatar-icon-businessman-editable-404-not-found-persona-for-ux-ui-design-cartoon-profile-picture-with-red-dot-colorful-website-mobile-error-user-badge-vector.jpg"
                  }
                  alt="Speaker"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-grow">
                  <p className="text-gray-700 text-sm">
                    <strong>Full Name:</strong> {speaker.fullName}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Institution:</strong> {speaker.institution}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Designation:</strong> {speaker.designation}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Email:</strong> {speaker.email}
                  </p>
                  <div className="flex mt-3">
                    <button
                      onClick={() => handleEdit(speaker)}
                      className="mr-3 px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(speaker._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleCollapse(speaker._id)}
                      className="ml-auto px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600"
                    >
                      {collapsed[speaker._id] ? "Hide Bio" : "Show Bio"}
                    </button>
                  </div>
                </div>
              </div>
              {collapsed[speaker._id] && (
                <div className="mt-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Biography:</strong> {speaker.biography}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddSpeaker;

import React, { useState } from "react";
import logo from "../../assets/asian.png";
import MainDashboard from "./MainDashboard";
import bg from "../../assets/images/adminBg.png";
import Gallery from "./Gallery";
import AddSpeaker from "./AddSpeaker";
import LogoutModal from "../../components/LogoutComponent";
import ParticipantAttendance from "./Attendance";
import AddSession from "./AddSession";
import ViewSessions from "./ViewSessions";
import LoginActivities from "./LoginActivities";

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeContainer, setActiveContainer] = useState("dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleContainerChange = (containerName) => {
    if (containerName === "logout") {
      setShowLogoutModal(true);
    } else {
      setActiveContainer(containerName.toLowerCase());
    }
  };

  const handleLogoutConfirm = () => {
    // Perform logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Store success message in local storage
    localStorage.setItem("logoutSuccessMessage", "Logout successful");
    window.location.href = "/admin";
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false); // Hide the modal
  };

  return (
    <>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-[#3051A0] border-b border-gray-200">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>

                <div to="/" className="flex  md:me-24 rounded bg-white">
                  <img src={logo} className="h-10 m-1" alt="logo" />
                </div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-white text-xl font-semibold">
                  ASIAN Microfinance Summit 2024
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div className="lg:flex gap-2">
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://mslbsl.com.np/images/logo.png"
                        alt="test"
                      />
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="absolute lg:hidden md:hidden block left-0 top-0 w-full height-[100vh] p-3 bg-white border border-gray-200 divide-y divide-gray-100 rounded shadow-lg"
                      id="dropdown-user"
                    >
                      <div className="px-4 py-3" role="none">
                        <button
                          type="button"
                          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                          onClick={toggleDropdown}
                          aria-expanded={isDropdownOpen ? "true" : "false"}
                        >
                          <span className="sr-only">closesidebar</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 1 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <ul className="space-y-2 font-medium">
                        <li>
                          <button
                            onClick={() => handleContainerChange("dashboard")}
                            className={`w-[100%] flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                              activeContainer === "dashboard"
                                ? "bg-purple-100 text-[#3051A0]"
                                : ""
                            }`}
                          >
                            <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                                  clip-rule="evenodd"
                                />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                              </svg>
                            </span>
                            <span className="ms-3 ">Dashboard</span>
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() => handleContainerChange("addEvent")}
                            className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-[#e8e2fb] group ${
                              activeContainer === "addEvent"
                                ? "bg-[#e8e2fb] text-[#3051A0] border-l-4 border-[#3051A0]"
                                : ""
                            }`}
                          >
                            <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                  clip-rule="evenodd"
                                />
                                <path
                                  fill-rule="evenodd"
                                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 15h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="ms-3">Add Event</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleContainerChange("gallery")}
                            className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-[#e8e2fb] group ${
                              activeContainer === "gallery"
                                ? "bg-[#e8e2fb] text-[#3051A0] border-l-4 border-[#3051A0]"
                                : ""
                            }`}
                          >
                            <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="ms-3">Gallery</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleContainerChange("speaker")}
                            className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-[#e8e2fb] group ${
                              activeContainer === "speaker"
                                ? "bg-[#e8e2fb] text-[#3051A0] border-l-4 border-[#3051A0]"
                                : ""
                            }`}
                          >
                            <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 5C8 3.343 9.343 2 11 2s3 1.343 3 3v6c0 1.657-1.343 3-3 3s-3-1.343-3-3V5Zm2 0v6a1 1 0 1 0 2 0V5a1 1 0 1 0-2 0Zm-5.293 8.293a1 1 0 0 1 1.414 0L7 14.586V18a1 1 0 0 1-2 0v-3.414l-1.293 1.293a1 1 0 1 1-1.414-1.414l3-3ZM16.293 5.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L17 7.414V18a1 1 0 1 1-2 0V7.414l-2.293 2.293a1 1 0 1 1-1.414-1.414l3-3ZM11 18a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1ZM5 21a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H5Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>

                            <span className="ms-3">Add Speaker</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <aside
          className="fixed top-0 left-0 z-40 w-64 md:w-fit lg:w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => handleContainerChange("dashboard")}
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 group ${
                    activeContainer === "dashboard"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <div className="ms-3 lg:block md:hidden">Dashboard</div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContainerChange("attendance")}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 ${
                    activeContainer === "attendance"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.25 3A.75.75 0 015.25 4.5h13.5a.75.75 0 110 1.5H5.25a.75.75 0 110-1.5zM3 6.75A1.75 1.75 0 014.75 5h14.5A1.75 1.75 0 0121 6.75v12.5A1.75 1.75 0 0119.25 21H4.75A1.75 1.75 0 013 19.25V6.75zM4.75 7.5v11.75h14.5V7.5H4.75zM9.97 14.22a.75.75 0 011.06 1.06L9.06 17.25a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 011.06-1.06l.97.97 2.44-2.44z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  <span className="ml-3">Attendance</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleContainerChange("queries")}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 ${
                    activeContainer === "queries"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path d="M5 3a1 1 0 1 0 0 2h1v2H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V10a3 3 0 0 0-3-3h-1V5h1a1 1 0 1 0 0-2h-1V1a1 1 0 1 0-2 0v2h-8V1a1 1 0 1 0-2 0v2H5Zm14 7H5v10h14V10Zm-7 3a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Zm0-3a1 1 0 0 1 1 1v.005a1 1 0 0 1-2 0V11a1 1 0 0 1 1-1Z" />
                    </svg>
                  </span>
                  <span className="ml-3">View Sessions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContainerChange("addevent")}
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 group ${
                    activeContainer === "addevent"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path d="M5 3a1 1 0 1 0 0 2h1v2H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V10a3 3 0 0 0-3-3h-1V5h1a1 1 0 1 0 0-2h-1V1a1 1 0 1 0-2 0v2h-8V1a1 1 0 1 0-2 0v2H5Zm14 7H5v10h14V10Zm-5 5h-2v2a1 1 0 1 1-2 0v-2H8a1 1 0 1 1 0-2h2V11a1 1 0 1 1 2 0v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                  </span>
                  <span className="ms-3 lg:block md:hidden">Add Session</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleContainerChange("gallery")}
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 group ${
                    activeContainer === "gallery"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ms-3 lg:block md:hidden">Gallery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContainerChange("loginactivity")}
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 group ${
                    activeContainer === "loginactivity"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ms-3 lg:block md:hidden">Login Audit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContainerChange("speaker")}
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 group ${
                    activeContainer === "speaker"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ms-3 lg:block md:hidden">Add Speaker</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContainerChange("logout")}
                  className={`w-full flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 ${
                    activeContainer === "logout"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 text-gray-500 transition group-hover:text-[#3051A0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z"
                        fill="#FF0000"
                      />
                      <path
                        d="M4.56141 11.2498L6.63141 9.17984C6.78141 9.02984 6.85141 8.83984 6.85141 8.64984C6.85141 8.45984 6.78141 8.25984 6.63141 8.11984C6.34141 7.82984 5.86141 7.82984 5.57141 8.11984L2.22141 11.4698C1.93141 11.7598 1.93141 12.2398 2.22141 12.5298L5.57141 15.8798C5.86141 16.1698 6.34141 16.1698 6.63141 15.8798C6.92141 15.5898 6.92141 15.1098 6.63141 14.8198L4.56141 12.7498H9.00141V11.2498H4.56141Z"
                        fill="#FF0000"
                      />
                    </svg>
                  </span>
                  <span className="ml-3">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <LogoutModal
          open={showLogoutModal}
          setOpen={setShowLogoutModal}
          title="Confirm Logout"
          description="Are you sure you want to logout?"
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />

        {/* Main Content */}
        <div
          className="p-4 sm:ml-64 pt-[75px]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          {activeContainer === "dashboard" && <MainDashboard />}
          {activeContainer === "addevent" && <AddSession />}
          {activeContainer === "gallery" && <Gallery />}
          {activeContainer === "attendance" && <ParticipantAttendance />}
          {activeContainer === "loginactivity" && <LoginActivities />}
          {activeContainer === "speaker" && <AddSpeaker />}
          {activeContainer === "queries" && <ViewSessions />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

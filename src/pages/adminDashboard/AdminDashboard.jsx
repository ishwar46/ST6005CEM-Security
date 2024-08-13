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
import {
  Bars3Icon,
  XMarkIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  PhotoIcon,
  SpeakerWaveIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import SendNotifications from "./SendNotifications";

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
                  {isDropdownOpen ? (
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                  )}
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
                          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
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
                            <UserGroupIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
                            <span className="ms-3 ">Dashboard</span>
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() => handleContainerChange("addevent")}
                            className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-[#e8e2fb] group ${
                              activeContainer === "addevent"
                                ? "bg-[#e8e2fb] text-[#3051A0] border-l-4 border-[#3051A0]"
                                : ""
                            }`}
                          >
                            <CalendarDaysIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
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
                            <PhotoIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
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
                            <SpeakerWaveIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
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
                  <UserGroupIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
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
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-gray-500 transition group-hover:text-[#3051A0]" />
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
                  <DocumentTextIcon className="w-6 h-6 text-gray-500 transition group-hover:text-[#3051A0]" />
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
                  <CalendarDaysIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
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
                  <PhotoIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
                  <span className="ms-3 lg:block md:hidden">Gallery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContainerChange("sendnoti")}
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-blue-300 group ${
                    activeContainer === "sendnoti"
                      ? "bg-blue-200 text-[#3051A0] border-l-4 border-[#3051A0]"
                      : ""
                  }`}
                >
                  <MegaphoneIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
                  <span className="ms-3 lg:block md:hidden">
                    Send Notifications
                  </span>
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
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
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
                  <SpeakerWaveIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-[#3051A0]" />
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
                  <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-500 transition group-hover:text-[#3051A0]" />
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
          {activeContainer === "sendnoti" && <SendNotifications />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

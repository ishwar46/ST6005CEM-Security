import React, { useState, useEffect } from "react";
import Logo from "../assets/asian.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpCircleIcon,
  BellIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsLoggedIn(true);
      if (user.isAdmin) {
        setIsAdmin(true);
        setUsername("Admin");
      } else if (
        user.personalInformation &&
        user.personalInformation.fullName
      ) {
        setUsername(user.personalInformation.fullName.firstName);
      } else {
        setUsername("User");
      }
    } else {
      setIsLoggedIn(false);
      setUsername("Guest");
      setIsAdmin(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("Guest");
    setIsAdmin(false);
    navigate("/homepage");
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/homepage" className="flex items-center">
          <img src={Logo} className="h-[60px] lg:h-[80px]" alt="ASIAN Logo" />
        </a>

        <div className="flex items-center space-x-8">
          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? "" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col lg:justify-center lg:items-center p-4 mt-4 border border-blue-300 rounded-lg bg-blue-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  exact="true"
                  to="/homepage"
                  className={`block py-2 px-3 rounded-lg ${
                    location.pathname === "/homepage"
                      ? "text-green-300"
                      : "text-gray-300"
                  } md:bg-transparent md:p-0 hover:text-green-400`}
                >
                  Home
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center space-x-1 py-2 px-3 rounded-lg ${
                    location.pathname.startsWith("/about")
                      ? "text-green-300"
                      : "text-gray-300"
                  } md:bg-transparent md:p-0 hover:text-green-400`}
                >
                  About
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <ul
                  className={`${
                    dropdownOpen ? "block" : "hidden"
                  } absolute bg-white text-black shadow-lg border rounded mt-1 min-w-max`}
                >
                  <li>
                    <Link
                      to="/aboutsummit"
                      className="block py-2 px-4 hover:bg-green-100 flex items-center space-x-2"
                    >
                      <span>About Summit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/membersasian"
                      className="block py-2 px-4 hover:bg-green-100 flex items-center space-x-2"
                    >
                      <span>Our Members</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/history"
                      className="block py-2 px-4 hover:bg-green-100 flex items-center space-x-2"
                    >
                      <span>History of Micro Summit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  exact="true"
                  to="/ceomessage"
                  className={`block py-2 px-3 rounded-lg ${
                    location.pathname === "/ceomessage"
                      ? "text-green-300"
                      : "text-gray-300"
                  }  md:bg-transparent  md:p-0 hover:text-green-400`}
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  exact="true"
                  to="/schedulenew"
                  className={`block py-2 px-3 rounded-lg ${
                    location.pathname === "/schedulenew"
                      ? "text-green-300"
                      : "text-gray-300"
                  }  md:bg-transparent  md:p-0 hover:text-green-400`}
                >
                  Event Schedule
                </Link>
              </li>
              <li>
                <Link
                  exact="true"
                  to="/register"
                  className={`block py-2 px-3 rounded-lg ${
                    location.pathname === "/register"
                      ? "text-green-300"
                      : "text-gray-300"
                  }  md:bg-transparent  md:p-0 hover:text-green-400`}
                >
                  Registration
                </Link>
              </li>
              <li>
                <Link
                  exact="true"
                  to="/accomodation"
                  className={`block py-2 px-3 rounded-lg ${
                    location.pathname === "/accomodation"
                      ? "text-green-300"
                      : "text-gray-300"
                  }  md:bg-transparent  md:p-0 hover:text-green-400`}
                >
                  Accommodation
                </Link>
              </li>
              <li>
                <Link
                  exact="true"
                  to="/gallery"
                  className={`block py-2 px-3 rounded-lg ${
                    location.pathname === "/gallery"
                      ? "text-green-300"
                      : "text-gray-300"
                  }  md:bg-transparent  md:p-0 hover:text-green-400`}
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNotificationClick}
              className="text-gray-300 hover:text-green-400"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link
              exact="true"
              to={isAdmin ? "/admindashboard" : "/userdashboard"}
              className="block py-2 px-3 text-green-300 font-semibold md:p-0 hover:text-green-400"
            >
              👋 Hey! {username}
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <PowerIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Logout
              </button>
            ) : (
              <button
                onClick={toggleLoginDropdown}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <ArrowUpCircleIcon
                  className="h-5 w-5 mr-2"
                  aria-hidden="true"
                />
                Login
              </button>
            )}
            {!isLoggedIn && (
              <ul
                className={`${
                  loginDropdownOpen ? "block" : "hidden"
                } absolute bg-white text-black shadow-lg border rounded mt-1 min-w-max right-0`}
              >
                <li>
                  <Link
                    to="/admin"
                    className="block py-2 px-4 hover:bg-green-100"
                  >
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-4 hover:bg-green-100"
                  >
                    Member Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

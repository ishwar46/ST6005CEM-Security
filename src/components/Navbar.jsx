import React, { useState, useEffect } from "react";
import Logo from "../assets/asian.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

  return (
    <nav className="bg-white border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/homepage"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-[80px]" alt="ACSIC Logo" />
        </a>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col lg:justify-center lg:items-center p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                exact="true"
                to="/homepage"
                className={`block py-2 px-3 rounded ${
                  location.pathname === "/homepage"
                    ? "text-green-700"
                    : "text-blue-700"
                } md:bg-transparent md:p-0 hover:text-emerald-500`}
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center space-x-1 py-2 px-3 rounded ${
                  location.pathname.startsWith("/homepage")
                    ? "text-blue-700"
                    : "text-blue-700"
                } md:bg-transparent md:p-0 hover:text-emerald-500`}
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
                    to="/memebersacsic"
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
                className={`block py-2 px-3 rounded ${
                  location.pathname === "/ceomessage"
                    ? "text-green-700"
                    : "text-blue-700"
                }  md:bg-transparent  md:p-0 hover:text-emerald-500`}
              >
                Messages
              </Link>
            </li>
            <li>
              <Link
                exact="true"
                to="/schedulenew"
                className={`block py-2 px-3 rounded ${
                  location.pathname === "/schedulenew"
                    ? "text-green-700"
                    : "text-blue-700"
                }  md:bg-transparent  md:p-0 hover:text-emerald-500`}
              >
                Event Schedule
              </Link>
            </li>
            <li>
              <Link
                exact="true"
                to="/register"
                className={`block py-2 px-3 rounded ${
                  location.pathname === "/register"
                    ? "text-green-700"
                    : "text-blue-700"
                }  md:bg-transparent  md:p-0 hover:text-emerald-500`}
              >
                Registration
              </Link>
            </li>
            <li>
              <Link
                exact="true"
                to="/accomodation"
                className={`block py-2 px-3 rounded ${
                  location.pathname === "/accomodation"
                    ? "text-green-700"
                    : "text-blue-700"
                }  md:bg-transparent  md:p-0 hover:text-emerald-500`}
              >
                Accomodation
              </Link>
            </li>
            <li>
              <Link
                exact="true"
                to="/gallery"
                className={`block py-2 px-3 rounded ${
                  location.pathname === "/gallery"
                    ? "text-green-700"
                    : "text-blue-700"
                }  md:bg-transparent  md:p-0 hover:text-emerald-500`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                exact="true"
                to={isAdmin ? "/admindashboard" : "/userdashboard"}
                className="block py-2 px-3 text-green-700 font-semibold md:p-0 hover:text-emerald-500"
              >
                👋 Hey! {username}
              </Link>
            </li>

            <li className="relative">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-green-600 block text-center"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={toggleLoginDropdown}
                  className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-600 block text-center"
                >
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
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import PopSign from "./PopSign";
import Profile from "../layout/Profile";
import { getAuthToken, removeAuthToken } from "../utils/utility";
import { logoutRoute } from "../api/authApi";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Notification from "../popupComp/Notification";
import { FaOpencart } from "react-icons/fa";
// import ModeSwitch from "./ModeSwitch";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    setToken(getAuthToken());
  }, [token]);

  const onLogout = async () => {
    const token = getAuthToken();
    const decodedToken = jwtDecode(token);
    removeAuthToken();
    setToken(getAuthToken());
    await logoutRoute(decodedToken._id);
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <nav className="bg-white border rounded-md shadow-neutral-500 border-gray-200 dark:bg-gray-900  dark:text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://th.bing.com/th/id/OIP.Fn5UCeoXh_m5IT6PeoE_EAAAAA?w=190&h=177&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              className="h-8 w-10 text-blue-500"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap hidden md:block">
              Books
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">
            {token == null ? (
              <Link
                className="flex justify-between items-center gap-1"
                onClick={handleOpenPopup}
              >
                <span className="font-bold text-sm ">Log In</span>
                <FaArrowRight />
              </Link>
            ) : (
              <div className="flex flex-wrap justify-start items-center gap-3 text-2xl">
                <Notification />
                <Profile onClose={onLogout} />
                <Link to="/cart">
                  <div className="flex flex-col justify-start items-start">
                    <span className="text-sm font-bold ml-3 -mb-2 text-red-700">
                      0
                    </span>
                    <div className="flex flex-wrap justify-start items-center">
                      <FaOpencart />
                      <p className="text-xs font-bold">cart</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="text-2xl dark:text-white"
            >
              {darkMode ? <MdDarkMode /> : <MdLightMode />}
            </button>

            {isPopupOpen && <PopSign onClose={handleClosePopup} />}
          </div>
          <div className="w-full md:w-auto md:order-1">
            <ul className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:border-0 md:bg-white md:dark:bg-gray-900 dark:border-white dark:shadow-md">
              {[
                { to: "/", label: "Home", className: "home" },
                { to: "/about", label: "About" },
                { to: "/blog", label: "Services" },
                { to: "/shop", label: "Shop" },
                { to: "/", label: "Contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className={`nav-link ${item.className && item.className}`}
                    aria-current={item.label === "Home" ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

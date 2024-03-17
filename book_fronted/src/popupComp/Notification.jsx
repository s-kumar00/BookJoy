import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationRed, setIsNotificationRed] = useState(true);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotification = () => {
    setIsNotificationRed(false);
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        id="dropdownNotificationButton"
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
      >
        <IoMdNotifications className="text-2xl" />
        {isNotificationRed && (
          <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900" />
        )}
      </button>
      {isOpen && (
        <div
          id="dropdownNotification"
          className="z-20 absolute left-1 mt-4 w-80 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:divide-gray-700"
          aria-labelledby="dropdownNotificationButton"
        >
          {/* Dropdown menu */}
          <div className="font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
          </div>
          <div className="divide-y  divide-gray-100 dark:divide-gray-700">
            <a
              href="#"
              className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                <img
                  className="rounded-full w-11 h-11"
                  src="https://wallpaperaccess.com/full/1214706.jpg"
                  alt="Jese image"
                />
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  New message from{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Jese Leos
                  </span>
                  <p>I bought a book</p>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  a few moments ago
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                <img
                  className="rounded-full w-11 h-11"
                  src="https://wallpaperaccess.com/full/1214706.jpg"
                  alt="Joseph image"
                />
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Joseph Mcfall
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    5 others
                  </span>{" "}
                  started following you.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  10 minutes ago
                </div>
              </div>
            </a>
          </div>
          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
          >
            <div
              onClick={handleNotification}
              className="inline-flex items-center"
            >
              <FaEye className="text-2xl" />
              View all
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default Notification;

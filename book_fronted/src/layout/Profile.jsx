import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdmin } from "../utils/utility";
import { CgProfile } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { TbHelpSquareRounded } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";

const Profile = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        id="dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center rounded-xl px-6 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        type="button"
      >
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="user photo"
        />
        {getAdmin().name}
      </button>
      {isOpen && (
        <div
          id="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <Link to="/">
              <div className="flex justify-start items-center gap-4 font-semibold">
                <CgProfile />
                <p className="hover:font-bold">My Profile</p>
              </div>
            </Link>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownAvatarNameButton"
          >
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex justify-start items-center gap-4 font-semibold">
                  <CiEdit />
                  <p className="hover:font-bold">Edit Profile</p>
                </div>
              </Link>
            </li>
            {getAdmin().isAdmin === true ? (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex justify-start items-center gap-4 font-semibold">
                    <MdOutlineDashboard />
                    <p className="hover:font-bold">Dashboard</p>
                  </div>
                </Link>
              </li>
            ) : null}

            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex justify-start items-center gap-4 font-semibold">
                  <TbHelpSquareRounded />
                  <p className="hover:font-bold">Helps</p>
                </div>
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <button
              onClick={onClose}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              <div className="flex justify-start items-center gap-4 font-semibold">
                <CiLogout />
                <p className="hover:font-bold">Sign Out</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

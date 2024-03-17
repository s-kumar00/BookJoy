import React, { useState } from "react";
import Folder from "../assets/Folder.png";
import Search from "../assets/Search.png";
import User from "../assets/User.png";
import logo from "../assets/logo1.png";
import Control from "../assets/Control.png";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", icon: `${Search}`, src: "/admin/dashboard" },
    { title: "Upload Book", icon: `${User}`, src: "/admin/dashboard/upload" },
    { title: "Manage Book", icon: `${Folder}`, src: "/admin/dashboard/manage" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <Link to="/" >
            <img
              src={logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
          </Link>
          <h1
            className={`text-gray-700 origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Admin Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={Menu.icon} className="font-bold" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-gray-700 font-medium`}
              >
                <Link to={Menu.src}>{Menu.title}</Link>
                {/* {Menu.title} */}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div> */}
    </div>
  );
};

export default SideBar;

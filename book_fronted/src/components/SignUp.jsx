import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineGoogle } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { registerRoute } from "../api/authApi";
import { setAuthToken } from "../utils/utility";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const SignUP = ({ handleToggle }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if(name.trim().length < 3){
      toast.error("Name must be at least 3 character long!...",{
        position:"top-right",
        autoClose:1000
      })
    } 
    
    if (password.trim().length >= 6) {
      if (password === confirmPassword) {
        const dataRes = await registerRoute({ name, email, password });
        if (dataRes.data.alert) {
          toast.success(dataRes.data.message, {
            autoClose: 1000,
          });
          handleToggle();
          setAuthToken(dataRes.data.token);
        } else {
          toast.warning(dataRes.data.message, {
            autoClose: 1000,
          });
        }
      } else {
        toast.error("Password Not Match!... ", {
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Password must be at least 6 character long!... ", {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-4">
        Sign up for an account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            className="rounded-md p-2 w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            className="rounded-md p-2 w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="rounded-md p-2 w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="rounded-md p-2 w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-100 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 w-full font-bold text-md bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className="text-center py-2">
        <p>
          Already have an account ?{" "}
          <Link
            onClick={handleToggle}
            className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
          >
            <span>Login</span>
            <FiExternalLink />
          </Link>
        </p>
      </div>

      <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          OR
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-8 text-2xl text-blue-600 cursor-pointer">
        <AiOutlineGoogle />
        <DiGithubBadge />
        <FaLinkedin />
        <FaFacebook />
      </div>
    </>
  );
};

export default SignUP;

import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { toast } from "react-toastify";
import { loginRoute } from "../api/authApi";
import { setAuthToken, setAdmin } from "../utils/utility";
import ForgetPassword from "../popupComp/ForgetPassword";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const Login = ({ handleToggle, onClose }) => {
  const [isPassword, setIsPassword] = useState(true);
  const handlePassword = () => {
    setIsPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await loginRoute({ email, password });
      if (response.data.alert) {
        setAuthToken(response.data.token);
        setAdmin(response.data.user);
        onClose();
      } else {
        toast.error(response.data.message, {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isPassword ? (
        <>
          <h1 className="text-2xl font-extrabold text-center ">
            Welcome Back..!
          </h1>
          <p className="text-slate-500 pb-2 text-center">
            Enter details to Login
          </p>
          <form onSubmit={handleSubmit}>
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

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  onClick={handlePassword}
                  className="font-medium text-indigo-600"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-4 w-full font-bold text-md bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-center py-2">
            <p>
              Not registered yet?{" "}
              <Link
                onClick={handleToggle}
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Register now </span>
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
      ) : (
        <ForgetPassword handleToggle={handleToggle} onClose={onClose} />
      )}
    </>
  );
};

export default Login;

import React, { useState } from "react";
import OtpVerification from "./OtpVerification";
import { IoKeyOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { otpRoute } from "../api/authApi";
import { toast } from "react-toastify";

const ForgetPassword = ({ handleToggle, onClose }) => {
  const [isOtp, setIsOtp] = useState(true);
  const [isEmail, setIsEmail] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    try {
      const response = await otpRoute({ email });
      if (response.data.alert) {
        setIsOtp(false);
        setIsEmail(email);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isOtp ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold">Reset password</h1>
            <p className="text-sm font-medium text-gray-400">
              Fill up the form to verify email
            </p>
          </div>
          <form onSubmit={handleSubmit} className="my-5">
            <div className="flex flex-col space-y-5">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <IoKeyOutline className="font-bold text-2xl" />
                <span>Send OTP</span>
              </button>
              <p className="text-center">
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
          </form>
        </>
      ) : (
        <OtpVerification handleToggle={handleToggle} email={isEmail} />
      )}
    </>
  );
};

export default ForgetPassword;

import React from "react";
import { toast } from "react-toastify";
import { changePasswordRoute } from "../api/authApi";

const ResetPassword = ({ handleToggle, email }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password != confirmPassword) {
      toast.error("Password not match", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    try {
      const response = await changePasswordRoute({ email, password });
      if (response.data.alert) {
        handleToggle();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Reset password</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
      >
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="New Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Retype password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-md font-bold shadow-sm"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

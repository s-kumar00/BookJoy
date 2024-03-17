import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { RxCross2 } from "react-icons/rx";

const PopSign = ({ onClose }) => {
  const [isLoginOpen, setLoginOpen] = useState(true);
  const handleToggle = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-400 opacity-75"></div>
        </div>
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
          <RxCross2
            onClick={onClose}
            className="text-4xl font-bold absolute top-0 right-0 m-4 p-2 text-gray-700 hover:text-gray-950 cursor-pointer"
          />
          {/* Toggle between login and sign up */}
          {isLoginOpen ? (
            <Login handleToggle={handleToggle} onClose={onClose} />
          ) : (
            <SignUp handleToggle={handleToggle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopSign;

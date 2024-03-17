import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import { verifyOtpRoute } from "../api/authApi";
import { toast } from "react-toastify";

const OtpVerification = ({ handleToggle, email }) => {
  const [changePassword, setChangePassword] = useState(true);
  const [otpValue, setOtpValue] = useState("");

  const handleOtpChange = (index, value) => {
    let newOtpValue = otpValue;
    newOtpValue =
      newOtpValue.substring(0, index) +
      value +
      newOtpValue.substring(index + 1);
    setOtpValue(newOtpValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtpRoute({ email, otpValue });
      if (response.data.alert) {
        setChangePassword(false);
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
    } catch (err) {
      console.log(err);
      toast.error("Something wrong", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };


  return (
    <>
      {changePassword ? (
        <div className="mx-auto flex w-full max-w-md flex-col space-y-5">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <p className="text-2xl font-extrabold">Email Verification</p>
            <p className="flex flex-row text-sm font-medium text-gray-400">
              We have sent a code to your email ba**@gmail.com
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-8">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {/* Customize the input fields */}
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        className="w-full h-full text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name={`digit-${index}`}
                        id={`digit-${index}`}
                        maxLength={1}
                        value={otpValue[index - 1] || ""}
                        onChange={(e) =>
                          handleOtpChange(index - 1, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-md font-bold shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <Link className="flex flex-row items-center text-blue-600">
                      Resend
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <ResetPassword handleToggle={handleToggle} email={email} />
      )}
    </>
  );
};

export default OtpVerification;

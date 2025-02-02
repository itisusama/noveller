import React from "react";
import LoginSlider from "../../components/signin/LoginSlider";
import img from "../../assets/logo.png";
import ForgetPasswordForm from "../../components/signin/ForgetPasswordForm";

const ForgetPasswordPage = () => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Slider */}
      <div className="lg:w-1/2 w-full h-full bg-gray-800">
        <LoginSlider />
      </div>

      {/* Right Side: Login Form */}
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center px-6 lg:px-20 overflow-y-auto">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <img
              src={img}
              alt="App Logo"
              className="lg:ml-9 sm:mx-auto w-20 lg:w-28 h-20 lg:h-28 sm:w-24 sm:h-24 mb-5 sm:my-8"
            />
          </div>
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;

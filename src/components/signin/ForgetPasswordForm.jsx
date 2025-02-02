import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// Define Zod schema
const loginSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
});

const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    // START:: Password Reset
    try {
      await sendPasswordResetEmail(auth, data.email);
      alert("Password reset email sent successfully. Please check your inbox.");
      navigate("/");
      } 
    catch (error) {
        console.error("Error sending password reset email:", error.message);
        alert("Failed to send password reset email. Please try again.");
      }
    // END:: Password Reset
  };

  return (
    <div>
      <p className="text-start ml-9 my-4 font-inter font-[600] text-[28px] leading-[40px]">
        Forgot Password
      </p>
      <p className="text-start ml-9 my-1 text-[#8C8C8C] font-inter font-[400] text-[16px] leading-[20px]">
        Enter your email address, and we'll send you a link to get back into your account.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 md:p-8">
        <div>
          <label
            htmlFor="email"
            className="ml-2 flex items-center font-inter text-[#000000] font-[400] text-[16px] leading-[24px]"
          >
            Email <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            // ref={emailRef}
            type="email"
            id="email"
            placeholder="Enter email or username"
            {...register("email")}
            className="mt-2 w-full sm:h-[44px] sm:w-[360px] bg-white text-black placeholder:text-[#D0D5DD] border border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] rounded-[10px] 
              py-[12px] px-[14px] focus:outline-none font-[400] text-[16px] leading-[24px]"
            autoComplete="off"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {errors.email && (
            <p className="text-red-500 text-[16px] mt-2">
              {errors.email.message}  
            </p>
          )}
        </div>

        <button
          className={`w-full ml-1 sm:h-[44px] sm:w-[360px] text-[16px] py-[10px] px-[14px] rounded-[100px] 
                    ${isFocused ? 'bg-[#FFC600] text-[#000000]' : 'bg-[#FFF1B2] text-[#B4B4B4]'} 
                    font-bold`}
          // onClick={() => handleResetPassword()}
          >
          Verify Now
        </button>
        <br />
        <Link to="/" className="flex justify-center ml-8 items-center text-sm font-[600] text-[16px] mt-0">
          Back to Log in
        </Link>
      </form>
    </div>  
  );
};

export default ForgetPasswordForm;

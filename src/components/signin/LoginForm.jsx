import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/LoginSchema";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase"; 
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    const email = watch("email", "");
    const password = watch("password", "");

    useEffect(() => {
        const isFormValid = email.trim() !== "" && password.trim() !== "";
        setIsButtonDisabled(!isFormValid);
    }, [email, password]);

    
    // const onSubmit = async (data) => {
    //     // console.log("Form Data: ", data);
    //     // const { email, password } = data;
    //     // if (email !== "test@example.com" || password !== "Password123!") {
    //     //     setIsLoginError(true); 
    //     // } else {
    //     //     setIsLoginError(false); 
    //     // }
    //     try {
    //         const { email, password } = data;
    //         // console.log("Attempting to sign in with:", email, password);
    
    //         // Sign in the user
    //         await signInWithEmailAndPassword(auth, email, password);
    
    //         // Save user token to localStorage
    //         const userToken = auth.currentUser?.uid || null;
    //         if (userToken) {
    //             localStorage.setItem("access_token", userToken);
    //             navigate("/dashboard");
    //         } else {
    //             console.error("Token not found. Authentication failed.");
    //         }
    
    //         console.log("Login successful");
    //     } catch (error) {
    //         console.error("Error logging in:", error.code, error.message);
    //         setIsLoginError(true);
    
    //         if (error.code === "auth/user-not-found") {
    //             console.error("No user found with this email.");
    //         } else if (error.code === "auth/wrong-password") {
    //             console.error("Incorrect password.");
    //         } else if (error.code === "auth/too-many-requests") {
    //             console.error("Too many attempts. Please try again later.");
    //         }
    //     }
    // };

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
    
            // Sign in the user
            await signInWithEmailAndPassword(auth, email, password);
    
            // Get user data
            const user = auth.currentUser;
            const userToken = user?.uid || null;
    
            if (userToken) {
                localStorage.setItem("access_token", userToken);
    
                // Check if the user is authorized
                if (userToken === "QeofcstBl6RZB08Q3OmUpEVmTuy2") {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
    
                // Save user data to Firestore "admin" collection
                const userDocRef = doc(db, "admin", userToken);
                await setDoc(userDocRef, {
                    uid: userToken,
                    email: user.email,
                    lastLogin: new Date().toISOString(),
                }, { merge: true });
    
                // Navigate to the dashboard
                navigate("/dashboard");
            } else {
                console.error("Token not found. Authentication failed.");
            }
    
            console.log("Login successful and data saved to Firestore.");
        } catch (error) {
            console.error("Error logging in:", error.code, error.message);
            setIsLoginError(true);
    
            if (error.code === "auth/user-not-found") {
                console.error("No user found with this email.");
            } else if (error.code === "auth/wrong-password") {
                console.error("Incorrect password.");
            } else if (error.code === "auth/too-many-requests") {
                console.error("Too many attempts. Please try again later.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div>
            <p className="text-start ml-9 my-4 font-inter font-[600] text-[42px] leading-[40px] sm:text-[36px] md:text-[40px] lg:text-[42px]">
                Log in
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 sm:p-4 md:p-6 lg:p-8">
                <div>
                    <label
                        htmlFor="email"
                        className="ml-2 flex items-center font-inter text-[#000000] font-[400] text-[16px] leading-[24px]"
                    >
                        Email <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email or username"
                        {...register("email")}
                        className="mt-2 w-full sm:h-[44px] sm:w-[300px] md:w-[360px] bg-white text-black placeholder:text-[#D0D5DD] border border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] rounded-[10px] py-[12px] pl-[14px] focus:outline-none font-[400] text-[16px] leading-[24px]"
                        required
                        autoComplete="off"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="ml-2 flex items-center font-inter text-[#000000] font-[400] text-[16px] leading-[24px]"
                    >
                        Password <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            {...register("password")}
                            className="mt-2 w-full sm:h-[44px] sm:w-[300px] md:w-[360px] bg-white text-black placeholder:text-[#D0D5DD] border border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] rounded-[10px] py-[12px] pl-[14px] focus:outline-none font-[400] text-[16px] leading-[24px]"
                        />
                        <button
                            type="button"
                            className="w-[20px] h-[20px] absolute top-[55%] lg:right-[-20px] transform -translate-y-[50%] text-[#000] focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-[16px] mt-2">{errors.password.message}</p>
                    )}
                    {isLoginError && (
                        <p className="text-red-500 text-[16px] mt-2 ">Invalid email or password</p>
                    )}
                </div>

                <div className="flex justify-end -mr-5 items-center text-sm font-inter font-[600] text-[16px] mt-0">
                    <Link to="/forgot-password" className="text-[#000000] m-0 p-0">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className={`w-full sm:w-[370px] py-[13px] px-[14px] rounded-[100px] font-inter 
                        ${isButtonDisabled ? 'bg-[#FFF1B2] text-[#B4B4B4] cursor-not-allowed' : 'bg-[#FFC600] text-[#000000]'} 
                        font-bold`}
                    disabled={isButtonDisabled}
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginForm;

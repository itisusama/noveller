import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { usePolicyContext } from "../Hooks/AddpolicyContext";
import UserProfile from "../assets/Group.svg";
import Notification from "../assets/Notification.svg";

const Header = () => {
  const location = useLocation();
  const { name } = location.state || {};
  let title = "";

    switch (location.pathname) {
      case "/dashboard":
        title = "Dashboard";
        break;
      case "/gallery":
        title = "Gallery";
        break;
      case "/add-images":
        title = "Gallery/ Add Images";
        break;
      case "/add-info":
        title = "Add Info";
        break;
      default:
        title = "Default Title";
        break;
  }

  return (
    <>
      <div className="w-full bg-white flex items-center justify-between p-1 shadow-md">
        <div>
          <h1 className="text-xl text-gray-800 pl-4">{title}</h1>
        </div>

        <h1>Author: Thritter</h1>

        {/* <div className="flex items-center justify-end space-x-4 sm:space-x-6 pr-4 sm:pr-7">
          <Link to="/notification">
            <div className="relative cursor-pointer">
              <img
                src={Notification}
                alt="Notification icon"
                className="w-full h-auto"
              />
            </div>
          </Link>
          <Link to="/settings">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden cursor-pointer border border-gray-300">
              <img
                src={UserProfile}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default Header;

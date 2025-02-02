import React, {useState, useEffect } from 'react';
import Sidebar from "./SideBar";
import Header from './Header';

const LayoutWrapper = ({ children }) => {
    const titles = {
        dashboard: "Dashboard",
        users: "Users",
        usersprofile: "Users Profile",
        games: "Games",
        shop: "Shop",
        learn: "Learn",
        settings: "Settings",
      };
      useEffect(() => {
        if (localStorage.getItem("title") === null || "") {
          localStorage.setItem("title", titles.dashboard);
          navigate("/dashboard");
        }
      }, []);
      const [activeSection, setActiveSection] = useState(
        localStorage.getItem("title") || titles.dashboard
      );

      const titleList = {
        dashboard: "Dashboard",
        users: "Users",
        usersprofile: "Users profile",
        games: "Games",
        shop: "Shop",
        learn: "Learn",
        settings: "Settings",
      };

      const headerTitle = titles[activeSection];
  return (
    <div className="flex flex-row bg-[#f6f6f6] min-h-screen">
      <div className='overflow-y-hidden'>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection}/>
      </div>
      <div className="flex-grow min-h-screen">
        <div className="bg-white h-full right-0">
          <div className="flex flex-col">
            <Header titleList={titleList} title={headerTitle}/>
            <hr />
          </div>
          <div className="flex flex-col my-2 mx-2 p-2 rounded-md bg-[#fcfdff] h-screen">
            {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutWrapper

import React from 'react';
import img from "../../assets/Slider.png";

const LoginSlider = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={img}
        alt="Background"
        className="w-full h-full object-cover md:scale-[1] lg:scale-[1.05] xl:scale-[1]"
      />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black to-transparent opacity-75"></div>
      <div className="absolute bottom-[10%] left-[5%] sm:left-[8%] md:left-[10%] lg:left-[8%] xl:left-[10%] text-white max-w-lg">
        <p className="text-xl font-[600] font-inter text-[22px] leading-[40px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[32px]">
          Write details about feature A here.
        </p>
        {/* <p className="text-xl font-[600] text-[22px] leading-[40px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[32px]">
          Write details about feature A here.
        </p> */}
      </div>
    </div>
  );
};

export default LoginSlider;

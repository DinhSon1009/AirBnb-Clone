import React from "react";
import { GlobeAltIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import { ReactComponent as SmallLogo } from "../../assets/images/airbnb_small.svg";
import { ReactComponent as LargeLogo } from "../../assets/images/air_bnb_large.svg";
import Search from "../Search/Search";

export default function Header({ offset }) {
  return (
    <header
      className={`fixed top-0 z-50 w-full flex items-center justify-center mx-auto transition duration-300 ease-out  h-20 ${
        offset > 80 ? "bg-white" : "bg-transparent"
      }`}
    >
      <div
        className={` flex justify-center p-3  dscontainer font-semibold ${
          offset > 80 ? "text-black" : "text-white"
        }`}
      >
        {/* left  */}
        <div className=" relative flex items-center h-10 cursor-pointer my-auto lg:basis-1/3">
          <LargeLogo
            className="hidden lg:block h-full object-left "
            fill={`${offset > 80 ? "#ff385c" : "white"}`}
          />
          <SmallLogo
            className="block lg:hidden object-contain object-left h-full"
            fill={`${offset > 80 ? "#ff385c" : "white"}`}
          />
        </div>
        {/* middle */}
        <Search />

        {/* <ul className="flex space-x-4 lg:basis-1/3 items-center justify-center  ">
          <li className="cursor-pointer header_link">
            <p className="relative active">Nơi ở</p>
          </li>
          <li className="cursor-pointer header_link">
            <p className="relative ">Trải nghiệm</p>
          </li>
          <li className="cursor-pointer header_link">
            <p className="relative ">Trải nghiệm trực tuyến</p>
          </li>
        </ul> */}

        {/* right  */}
        <div className="flex-grow flex items-center space-x-4 justify-end lg:basis-1/3 ">
          <p className="hidden md:inline cursor-pointer">Trở thành chủ nhà</p>
          <GlobeAltIcon className="h-6 cursor-pointer" />
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
            <MenuIcon className="h-6" />
            <UserCircleIcon className="h-6" />
          </div>
        </div>
      </div>
    </header>
  );
}

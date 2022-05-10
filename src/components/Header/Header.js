import { GlobeAltIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as SmallLogo } from "../../assets/images/airbnb_small.svg";
import { ReactComponent as LargeLogo } from "../../assets/images/air_bnb_large.svg";
import Search from "../Search/Search";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Header({ offset }) {
  const [searchClick, setSearchClick] = useState(false);
  const searchRef = useRef();
  const navigation = useNavigate();
  const suggestion = useSelector((state) => state.searchReducer.suggestion);
  useEffect(() => {
    const handleClick = (event) => {
      const { target } = event;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchClick(false);
        console.log("clicked outside");
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const onScroll1 = (e) => {
      setSearchClick(false);
    };
    // clean up code
    window.removeEventListener("scroll", onScroll1);
    window.addEventListener("scroll", onScroll1, { passive: true });
    return () => window.removeEventListener("scroll", onScroll1);
  }, []);

  const themes = () => {
    if (offset === undefined) {
      return {
        header: `sticky shadow-md bg-white after:ds_transition ${
          searchClick &&
          "after:bg-white after:!scale-y-[2.5] after:!opacity-100 "
        }`,
        text: "text-black",
        color: "#ff385c",
      };
    } else if (offset)
      return {
        header: `bg-white shadow-md after:ds_scrollTransition ${
          searchClick &&
          "after:bg-white after:!scale-y-[2.5] after:!opacity-100"
        }`,
        text: "text-black ",
        color: "#ff385c",
      };
    else
      return {
        header: `${
          searchClick
            ? "bg-white after:bg-white after:!scale-y-[2.5] after:!opacity-100"
            : "bg-transparent"
        }`,
        text: `${searchClick ? "text-black" : "text-white"}`,
        color: `${searchClick ? "#ff385c" : "white"}`,
      };
  };

  return (
    <header
      ref={searchRef}
      className={`fixed top-0 z-50 h-20 w-full left-0 mx-auto transition-all transform duration-300 ease-out ${
        themes().header
      } after:ds_transition `}
    >
      <div
        className={` flex justify-center h-full relative p-3 w-full max-w-[1440px] m-auto items-center dscontainer font-semibold opacity-100 ease-out z-10
         ${themes().text} `}
      >
        {/* left  */}
        <div className=" relative flex items-center h-10  my-auto lg:basis-1/3 ">
          <LargeLogo
            className="hidden lg:block h-full object-contain object-left cursor-pointer"
            fill={`${themes().color}`}
            onClick={(e) => navigation("/")}
          />
          <SmallLogo
            className="block lg:hidden object-contain object-left h-full cursor-pointer "
            fill={`${themes().color}`}
            onClick={(e) => navigation("/")}
          />
        </div>
        {/* middle */}
        <div
          className={`w-11/12 py-0 px-6 relative h-full md:absolute transition-all  duration-300 ease-in-out ${
            searchClick
              ? "visible opacity-100 w-full "
              : "invisible opacity-0 w-0 "
          } `}
        >
          <div className="absolute inset-0  w-full h-full m-auto  flex items-center ">
            <div className="w-full max-w-[850px] absolute inset-0 m-auto ">
              <Search.NoScroll />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className={`relative w-full max-w-[300px] mx-3 ${
              searchClick && "hidden"
            }`}
            onClick={() => {
              setSearchClick(!searchClick);
            }}
          >
            <Search />
          </button>
        </div>

        {/* right  */}
        <div className="flex flex-grow items-center space-x-4 justify-end basis-1/3 ">
          <p className="hidden md:inline cursor-pointer m-0 whitespace-nowrap">
            Trở thành chủ nhà
          </p>
          <GlobeAltIcon className="h-6 cursor-pointer" />
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
            <MenuIcon className="h-6" />
            <UserCircleIcon className="h-6" />
          </div>
        </div>
      </div>

      {/* <div className="w-full absolute  mt-[150px] inset-0">
        <DatePicker />
      </div> */}
    </header>
  );
}

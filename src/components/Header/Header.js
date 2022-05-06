import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { ReactComponent as SmallLogo } from "../../assets/images/airbnb_small.svg";
import { ReactComponent as LargeLogo } from "../../assets/images/air_bnb_large.svg";
import Search from "../Search/Search";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useNavigate, useRoutes } from "react-router";

export default function Header({ offset }) {
  const [input, setInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setInput("");
  };

  const themes = () => {
    if (offset === undefined) {
      return {
        header: "sticky shadow-md bg-white",
        text: "text-black",
        color: "#ff385c",
      };
    } else if (offset > 80)
      return {
        header: "bg-white shadow-md",
        text: "text-black ",
        color: "#ff385c",
      };
    else
      return {
        header: "bg-transparent",
        text: "text-white",
        color: "white",
      };
  };
  const navigation = useNavigate();
  // const search = () => {
  //   navigation({
  //     pathname:"/search",
  //     search:
  //   });
  // };

  return (
    <header
      className={`fixed top-0 z-50 w-full flex flex-wrap items-center justify-center  mx-auto transition duration-300 ease-out  h-20 ${
        themes().header
      }`}
    >
      <div
        className={` flex justify-center p-3 w-full dscontainer font-semibold 
         ${themes().text}`}
      >
        {/* left  */}
        <div className=" relative  flex items-center h-10  my-auto lg:basis-1/3">
          <LargeLogo
            className="hidden lg:block h-full object-left cursor-pointer"
            fill={`${themes().color}`}
            onClick={(e) => navigation("/")}
          />
          <SmallLogo
            className="block lg:hidden object-contain object-left h-full cursor-pointer"
            fill={`${themes().color}`}
            onClick={(e) => navigation("/")}
          />
        </div>
        {/* middle */}
        <Search input={input} setInput={setInput} />

        {/* right  */}
        <div className="flex-grow w-1/6 flex items-center space-x-4 justify-end lg:basis-1/3 ">
          <p className="hidden md:inline cursor-pointer m-0">
            Trở thành chủ nhà
          </p>
          <GlobeAltIcon className="h-6 cursor-pointer" />
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
            <MenuIcon className="h-6" />
            <UserCircleIcon className="h-6" />
          </div>
        </div>
      </div>
      {input && (
        <div className=" flex-col mx-auto w-full max-w-[600px] bg-white pb-4 !hidden phone:!flex ">
          <DateRangePicker
            className=""
            ranges={[selectionRange]}
            rangeColors={["#ff385c"]}
            onChange={handleSelect}
          />
          <div className="flex ml-4 items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">Số lượng :</h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              value={noOfGuests}
              min={1}
              onChange={(e) => setNoOfGuests(e.target.value)}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Hủy
            </button>
            <button className="flex-grow text-red-400">Tìm kiếm</button>
          </div>
        </div>
      )}
    </header>
  );
}

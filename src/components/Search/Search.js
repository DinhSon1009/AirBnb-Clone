import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import useClickOutside from "../../Hooks/useClickOutside/useCLickOutside";
import useDebounce from "../../Hooks/useDebounce/useDebounce";
import { setLocationID, setSearchInfo } from "../../redux/searchSlice";
import { setFlag } from "../../redux/spinnerSlice";
import httpServ from "../../services/http.service";

export default function Search({ searchInfo, LargeScreen }) {
  const suggestionRef = useRef();
  const dispatch = useDispatch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState(null);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const searchLargeScreenRef = useRef();
  const suggestLargeScreenRef = useRef();
  const smallScreenInputRef = useRef();
  const debounced = useDebounce(input, 300);
  const [focus, setFocus] = useState(false);
  const [chooseInput, setChooseInput] = useState(undefined);
  useClickOutside(suggestionRef, () => {
    setSuggestions(null);
    setShowSuggestions(false);
    setInput("");
    setChooseInput("");
  });
  useClickOutside(suggestLargeScreenRef, () => {
    setSuggestions(null);
    setShowSuggestions(false);
    setInput("");
    setChooseInput("");
  });

  useEffect(() => {
    if (!input.trim()) {
      return;
    } else {
      setShowSuggestions(true);
      dispatch(setFlag(false));
      httpServ
        .layDiaDiem(input)
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [debounced]);

  const handleSearch = () => {
    dispatch(setLocationID(select._id));
    dispatch(setSearchInfo(chooseInput));
    navigate({
      pathname: "/search",
      search: `?id=${select._id}&&location=${chooseInput}`,
    });
    setShowSuggestions(false);
    dispatch(setFlag(true));
    setSuggestions(null);
    setInput("");
  };
  return (
    <>
      {!LargeScreen ? (
        <div className="w-full mx-5 lg:mx-auto  flex items-center border-2 rounded-full  md:shadow-sm lg:basis-1/3 bg-white relative ">
          <div className="hidden md:inline-flex flex-grow pl-5 cursor-pointer bg-transparent outline-none text-sm text-gray-600 text-left font-semibold whitespace-nowrap overflow-hidden py-3">
            {searchInfo || "Bắt đầu tìm kiếm"}
          </div>
          <input
            ref={smallScreenInputRef}
            value={chooseInput || input}
            onChange={(e) => setInput(e.target.value)}
            className="inline-flex md:hidden w-full outline-none rounded-full pl-5 py-3 bg-white text-gray-600 flex-grow z-50"
            type="text"
            placeholder={searchInfo || "Bắt đầu tìm kiếm"}
          />
          <SearchIcon
            onClick={handleSearch}
            className="inline-flex h-8 w-8 bg-[#ff385c] text-white rounded-full p-2 cursor-pointer mx-2 
      flex-shrink-0 "
          />
          <div
            ref={suggestionRef}
            className={`absolute left-0 top-full mt-6 bg-white rounded-xl p-2 ${
              showSuggestions ? "visible" : "invisible"
            } `}
          >
            {suggestions &&
              suggestions.map((suggest, index) => (
                <button
                  className="relative w-full text-left flex text-gray-500 hover:bg-[#EBEBEB] items-center py-2 "
                  onClick={() => {
                    setChooseInput(`${suggest.name}, ${suggest.province}`);
                    setShowSuggestions(false);
                    setSelect(suggest);
                  }}
                  key={index}
                >
                  <LocationMarkerIcon
                    style={{
                      backgroundColor: "rgba(0, 128, 0, 0.2)",
                      color: "green",
                      borderRadius: "5px",
                    }}
                    className="p-[5px] w-12 h-12 flex-shrink-0  mr-5 "
                  />{" "}
                  {suggest.name}, {suggest.province}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="hidden md:flex md:flex-col text-center w-full transition transform ease-out duration-150 ">
          <h1 className="mt-8 relative after:absolute after:-bottom-1 after:left-1/2 after:w-24 after:-translate-x-1/2 after:h-[1px] after:bg-gray-500">
            Places to stay
          </h1>
          <ul
            className={`w-full m-auto rounded-full border flex text-left mt-4 ${
              focus ? "bg-[#f7f7f7]" : "bg-white"
            } `}
          >
            <li
              onClick={() => searchLargeScreenRef.current.focus()}
              className={`flex items-center lg:basis-[30%] basis-1/4 text-sm whitespace-nowrap transition cursor-pointer rounded-full 
              ${
                focus
                  ? "bg-white hover:bg-white shadow-xl outline-none border-none"
                  : "hover:bg-[#EBEBEB] shadow-none"
              }
              `}
            >
              <div className="pl-8 pr-3 lg:pr-8 py-2 lg:py-3  relative ">
                <p className="font-semibold text-xs lg:text-sm m-0">Location</p>
                <input
                  ref={searchLargeScreenRef}
                  value={chooseInput || input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  type="text"
                  placeholder="Where are you going?"
                  className="outline-none placeholder-gray-400 bg-transparent text-sm lg:text-base"
                />
                <div
                  ref={suggestLargeScreenRef}
                  className={`absolute left-0 top-full mt-6 bg-white rounded-xl p-2 ${
                    showSuggestions ? "visible" : "invisible"
                  } `}
                >
                  {suggestions &&
                    suggestions.map((suggest, index) => (
                      <button
                        className={` relative w-full text-left flex text-gray-500 hover:bg-[#EBEBEB] items-center py-2 mr-2
                    `}
                        onClick={() => {
                          setChooseInput(`${suggest.name},${suggest.province}`);
                          setShowSuggestions(false);
                          setSelect(suggest);
                        }}
                        key={index}
                      >
                        <LocationMarkerIcon
                          style={{
                            backgroundColor: "rgba(0, 128, 0, 0.2)",
                            color: "green",
                            borderRadius: "5px",
                          }}
                          className="p-[5px] w-12 h-12  mr-5 "
                        />{" "}
                        {suggest.name}, {suggest.province}
                      </button>
                    ))}
                </div>
              </div>
            </li>
            <li className="flex relative  items-center basis-1/4 lg:basis-[20%] whitespace-nowrap text-sm cursor-pointer rounded-full hover:bg-[#EBEBEB]">
              <div className="py-2 lg:py-3 px-6">
                <p className="font-semibold text-xs lg:text-sm m-0">Check in</p>
                <p className="text-gray-400 font-normal text-sm lg:text-base m-0">
                  Add dates
                </p>
              </div>
            </li>
            <li className=" text-sm flex basis-1/4 lg:basis-[20%] whitespace-nowrap items-center cursor-pointer rounded-full hover:bg-[#EBEBEB]">
              <div className="py-2 lg:py-3 px-6">
                <p className="font-semibold text-xs lg:text-sm m-0">
                  Check out
                </p>
                <p className="text-gray-400 font-normal text-sm lg:text-base m-0">
                  Add dates
                </p>
              </div>
            </li>
            <li className="flex text-sm basis-1/4 lg:basis-[30%] whitespace-nowrap items-center cursor-pointer hover:bg-[#EBEBEB] rounded-full pl-6 pr-2 py-2 lg:py-3">
              <div className="flex-grow">
                <p className="font-semibold text-xs lg:text-sm m-0">Guests</p>
                <p className="text-gray-400 font-normal text-sm lg:text-base m-0">
                  Add guests
                </p>
              </div>
              <button onClick={handleSearch}>
                <SearchIcon className="h-12 p-2 bg-primary rounded-full text-white" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

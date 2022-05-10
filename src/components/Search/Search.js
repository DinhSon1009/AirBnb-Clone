import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setLocationID, setSuggestion } from "../../redux/searchSlice";
import httpServ from "../../services/http.service";

export default function Search() {
  return (
    <div className="w-full mx-5 lg:mx-auto  flex items-center   border-2 rounded-full  md:shadow-sm lg:basis-1/3 bg-white relative ">
      <div className="flex-grow pl-5 cursor-pointer bg-transparent outline-none text-sm text-gray-600 text-left font-semibold whitespace-nowrap py-3">
        Bắt đầu tìm kiếm
      </div>
      <SearchIcon className="hidden  md:inline-flex h-8 bg-[#ff385c] text-white rounded-full md:p-2 cursor-pointer md:mx-2 " />
    </div>
  );
}

Search.NoScroll = function SearchNoScroll() {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.searchReducer);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState("");
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
    httpServ
      .layDiaDiem(e.target.value)
      .then((res) => {
        setSuggestions(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSearch = () => {
    dispatch(setLocationID(select._id));
    navigate({
      pathname: "/search",
      search: `?id=${select._id}&&location=${input}`,
    });
    dispatch(setSuggestion(false));
    setSuggestions("");
  };
  return (
    <div className="hidden md:flex md:flex-col text-center w-full  transition transform ease-out  duration-150 ">
      <h1 className="mt-16">Place to stay</h1>
      <ul className="w-full m-auto rounded-full border-2 flex bg-[#f7f7f7] text-left">
        <li className="flex items-center lg:basis-[30%] basis-1/4  text-sm whitespace-nowrap cursor-pointer hover:bg-[#EBEBEB] rounded-full ">
          <div className="px-3 lg:px-8 py-3.5  relative ">
            <p className="font-semibold m-0">Địa điểm</p>
            <input
              value={input}
              onChange={handleChange}
              type="text"
              placeholder="Bạn sắp đi đâu?"
              className="outline-none placeholder-gray-400 bg-transparent"
            />
            <div
              className={`absolute left-0 mt-6 bg-white rounded-xl px-2 ${
                searchState.suggestion ? "invisible" : "visible"
              } `}
            >
              {suggestions &&
                suggestions.map((suggest, index) => (
                  <button
                    className={` relative w-full text-left flex text-gray-500 hover:bg-[#EBEBEB] items-center py-2  
                    `}
                    onClick={() => {
                      setInput(suggest.province);
                      dispatch(setSuggestion(true));
                      setSelect(suggest);
                    }}
                    key={index}
                  >
                    <LocationMarkerIcon className="h-12 p-2 w-12 min-w-[3rem] bg-gray-300 mr-5 " />{" "}
                    {suggest.name}, {suggest.province}
                  </button>
                ))}
            </div>
          </div>
        </li>
        <li className="flex relative  items-center basis-1/4 lg:basis-[20%] whitespace-nowrap text-sm cursor-pointer rounded-full hover:bg-[#EBEBEB]">
          <div className="py-3.5 px-6">
            <p className="font-semibold m-0">Nhận phòng</p>
            <p className="text-gray-400 m-0">Thêm ngày</p>
          </div>
        </li>
        <li className=" text-sm flex basis-1/4 lg:basis-[20%] whitespace-nowrap items-center cursor-pointer rounded-full hover:bg-[#EBEBEB]">
          <div className="py-3.5 px-6">
            <p className="font-semibold m-0">Trả phòng</p>
            <p className="text-gray-400 m-0">Thêm ngày</p>
          </div>
        </li>
        <li className="flex text-sm basis-1/4 lg:basis-[30%] whitespace-nowrap items-center cursor-pointer hover:bg-[#EBEBEB] rounded-full pr-3.5 pl-6 py-3/5">
          <div className="flex-grow">
            <p className="font-semibold m-0">Khách</p>
            <p className="text-gray-400 m-0">Thêm khách</p>
          </div>
          <button onClick={handleSearch}>
            <SearchIcon className="h-12 p-2 bg-red-400 rounded-full text-white" />
          </button>
        </li>
      </ul>
    </div>
  );
};

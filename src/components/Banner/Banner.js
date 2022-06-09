import React from "react";
import nearByData from "../../fixtures/nearby.json";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchInfo } from "../../redux/searchSlice";

export default function Banner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative h-screen max-h-[800px]   ">
      <img
        src="https://a0.muscache.com/im/pictures/d9ed1a56-5abd-4fdd-9509-7684d1bce98d.jpg?im_w=1680"
        alt="banner"
        className="object-cover w-full block h-full object-center "
      />
      <div className="absolute translate-y-3/4 bottom-1/2 lg:translate-y-0  lg:bottom-[3rem] left-1/2 -translate-x-1/2 transform text-white flex items-center justify-center flex-col font-semibold">
        <p
          className="text-2xl md:text-3xl lg:text-5xl text-center border-r-4 border-solid animation-typewriter whitespace-nowrap overflow-hidden"
          style={{ maxWidth: "max-content", width: "30ch" }}
        >
          Hãy để trí tò mò của bạn dẫn lối
        </p>
        <button
          onClick={() => {
            let index = Math.floor(Math.random() * 8);
            dispatch(setSearchInfo(nearByData[index].location));
            navigate({
              pathname: "/search",
              search: `?id=${nearByData[index].locationId}&&location=${nearByData[index].location}`,
            });
          }}
          className="bg-white rounded-full mt-4 px-5 py-4 lg:px-8"
        >
          <span className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-lg font-semibold whitespace-nowrap">
            Tìm kiếm linh hoạt
          </span>
        </button>
      </div>
    </div>
  );
}

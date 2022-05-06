import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

export default function Search({ input, setInput }) {
  return (
    <div className="w-3/6 mx-8 flex items-center  border-2 rounded-full py-2 md:shadow-sm lg:basis-1/3 bg-white">
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          console.log(e.target.value);
        }}
        className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 "
        type="text"
        placeholder="Bắt đầu tìm kiếm"
      />
      <SearchIcon className="hidden  md:inline-flex h-8 bg-[#ff385c] text-white rounded-full md:p-2 cursor-pointer md:mx-2 " />
    </div>
  );
}

Search.NoScroll = function SearchNoScroll() {
  return (
    <div className="flex justify-center  ">
      <ul className="w-1/2 m-auto rounded-full border-2 flex ">
        <li className="relative w-1/4 text-sm cursor-pointer hover:bg-gray-300 rounded-full">
          <div className="px-5 py-2">
            <p className="font-semibold">Địa điểm</p>
            <input
              type="text"
              placeholder="Bạn sắp đi đâu?"
              className="outline-none placeholder-gray-400 py-2 bg-transparent"
            />
          </div>
          <div className="absolute right-0 bottom-0 h-1/2 w-0.5 bg-gray-200 transform -translate-y-1/2"></div>
        </li>
        <li className="relative  text-sm w-1/4 cursor-pointer hover:bg-gray-300 rounded-full">
          <div className="px-5 py-2">
            <p className="font-semibold">Nhận phòng</p>
            <p className="text-gray-400 py-2">Thêm ngày</p>
          </div>
          <div className="absolute right-0 bottom-0 h-1/2 w-0.5 bg-gray-200 transform -translate-y-1/2"></div>
        </li>
        <li className="relative  text-sm w-1/4 cursor-pointer hover:bg-gray-300 rounded-full">
          <div className="px-5 py-2">
            <p className="font-semibold">Trả phòng</p>
            <p className="text-gray-400 py-2">Thêm ngày</p>
          </div>
          <div className="absolute right-0 bottom-0 h-1/2 w-0.5 bg-gray-200 transform -translate-y-1/2"></div>
        </li>
        <li className="flex  text-sm items-center justify-between w-1/4 px-2 cursor-pointer hover:bg-gray-300 rounded-full">
          <div className="px-5 py-2">
            <p className="font-semibold">Khách</p>
            <p className="text-gray-400 py-2">Thêm khách</p>
          </div>
          <SearchIcon className="h-12 p-2 bg-red-400 rounded-full text-white" />
        </li>
      </ul>
    </div>
  );
};

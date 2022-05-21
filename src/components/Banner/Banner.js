import React from "react";

export default function Banner() {
  return (
    <div className="relative h-screen max-h-[800px]   ">
      <img
        src="https://a0.muscache.com/im/pictures/d9ed1a56-5abd-4fdd-9509-7684d1bce98d.jpg?im_w=1680"
        alt="banner"
        className="object-cover w-full block h-full object-center "
      />
      <div className="absolute bottom-[3rem] left-1/2 -translate-x-1/2 transform text-white flex items-center justify-center flex-col font-semibold">
        <p className="text-[1rem] md:text-[2rem] lg:text-[3rem] text-center">
          Hãy để trí tò mò của bạn dẫn lối
        </p>
        <button className="bg-white rounded-full mt-4 px-5 py-3 lg:py-4 lg:px-8">
          <span className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-sm lg:text-lg font-semibold whitespace-nowrap">
            Tìm kiếm linh hoạt
          </span>
        </button>
      </div>
    </div>
  );
}

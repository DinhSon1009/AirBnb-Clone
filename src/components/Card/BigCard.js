import React from "react";

export default function BigCard({ content, img }) {
  return (
    <div className="relative ">
      <img src={img} alt="hinh anh" className="rounded-xl object-cover " />
      <div className="absolute top-6 lg:mx-8 lg:px-16 font-semibold sm:top-20 left-5 ">
        <p className="text-white pr-32 text-5xl md:text-3xl xl:text-5xl select-none xl:pr-28 md:pr-10">
          {content}
        </p>
        <button className="bg-white rounded-xl py-4 px-6 mt-16 font-semibold">
          Trải nghiệm
        </button>
      </div>
    </div>
  );
}

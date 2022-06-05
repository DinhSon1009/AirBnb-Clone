import React from "react";

export default function DatVe({ room }) {
  return (
    <div className="border rounded-xl shadow-xl p-6 sticky top-32 z-10 ">
      <div className="flex justify-between">
        <div className="flex font-normal justify-start items-baseline mb-6">
          <span className=" text-2xl font-semibold text-title">
            ${room?.price.toLocaleString()}
          </span>
          <span className="font-normal whitespace-nowrap text-lg">/ đêm</span>
        </div>
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex">
          <div className="flex-1 pl-6 py-3 pr-3 rounded-tl-lg border cursor-pointer">
            <div className="font-semibold">Check-In</div>
            <div className="text-sm text-gray-400">Add date</div>
          </div>
          <div className="flex-1 pl-6 py-3 pr-3 border rounded-tr-lg border-l-0 cursor-pointer">
            <div className="font-semibold">Check-Out</div>
            <div className="text-sm text-gray-400">Add date</div>
          </div>
        </div>
        <div className="pl-6 py-3 pr-3 rounded-b-lg border border-t-0 cursor-pointer">
          <div className="font-semibold">Khách</div>
          <div className="text-sm text-gray-400">1 Khách</div>
        </div>
      </div>
      <button className="bg-primary w-full mt-4 text-white px-6 py-3 text-base font-semibold rounded-lg outline-none shadow-lg hover:opacity-90 transition ">
        Đặt phòng
      </button>
      <h5 className="text-center font-normal mt-3">Bạn vẫn chưa bị trừ tiền</h5>
      <div className="py-2 px-0">
        <div className="flex justify-between items-center pb-3">
          <span className="underline text-base">
            ${room?.price.toLocaleString()}x 1 đêm
          </span>
          <span className="text-base">${room?.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pb-3">
          <span className="underline text-base">Phí dịch vụ</span>
          <span className="text-base">$100</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-6 pb-3">
        <span className="font-semibold text-base text-title">
          Tổng trước thuế
        </span>
        <span>$52,100</span>
      </div>
    </div>
  );
}

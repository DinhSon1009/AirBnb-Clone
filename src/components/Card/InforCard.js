import { HeartIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router";

export default function InforCard({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
  bath,
  bedRoom,
  guests,
  id,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/RoomDetail/${id}`)}
      className="border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out py-7 first:border-t sm:first:border-t-0"
    >
      <div className=" w-full ">
        <img
          src={img}
          alt={`ảnh ${location}`}
          className="object-cover rounded-xl w-full"
        />
      </div>
      <div className="space-y-1 px-2">
        <h4 className="text-lg font-medium mt-2">{title}</h4>
        <p className="m-0">{location}</p>
        <p className="text-sm text-gray-500 flex-grow m-0">
          {guests} guests - {bedRoom} bedrooms - {bath} baths
        </p>
        <p className="text-lg lg:text-lg font-semibold">
          {price.toLocaleString()}đ/đêm
        </p>
      </div>
    </div>
  );
}

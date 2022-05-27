import { HeartIcon } from "@heroicons/react/outline";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";
import images from "./fakeDataImage";

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
  const scrollRef = useRef();
  const [isShown, setIsShown] = useState(false);

  const scroll = (direction) => {
    const { current } = scrollRef;
    direction === "left"
      ? (current.scrollLeft -= current.clientWidth)
      : (current.scrollLeft += current.clientWidth);
  };
  return (
    <div className="border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out py-7 first:border-t sm:first:border-t-0">
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="relative w-full"
      >
        <div
          ref={scrollRef}
          className=" w-full overflow-y-hidden overflow-x-scroll scrollbar-hide flex"
        >
          <img
            src={img || DEFAULT_IMAGE_PATH}
            onClick={() => navigate(`/RoomDetail/${id}`)}
            alt={`ảnh ${location}`}
            className="object-cover rounded-xl w-full  h-full transition-all duration-300"
            style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
          />
          {Array(4)
            .fill(0)
            .map((item, index) => (
              <img
                onClick={() => navigate(`/RoomDetail/${id}`)}
                className="object-cover rounded-xl w-full h-full transition-all duration-300 "
                alt="hinh mo ta"
                src={images[`hinh${index + 1}`]}
                style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
              />
            ))}
        </div>
        {isShown && (
          <div>
            <ArrowLeft
              onClick={() => scroll("left")}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "2rem",
                left: 0,
              }}
              className="absolute bg-slate-50 text-primary rounded-full"
            />
            <ArrowRight
              onClick={() => scroll("right")}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "2rem",
                right: 0,
              }}
              className="absolute bg-slate-50 text-primary rounded-full"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-1 px-2">
        <h4 className="text-lg font-medium mt-2">{title}</h4>
        <p className="m-0">{location}</p>
        <p className="text-sm text-gray-500 flex-grow m-0">
          {guests} guests - {bedRoom} bedrooms - {bath} baths
        </p>
        <p className="text-lg lg:text-lg font-semibold ">
          {price.toLocaleString()}đ/đêm
        </p>
      </div>
    </div>
  );
}

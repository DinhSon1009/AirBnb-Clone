import { HeartIcon } from "@heroicons/react/outline";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";
import { fakeDataImages } from "./fakeDataImage";
// import useEventListener from "../../Hooks/useEventListener/useEventListener";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

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
  const navigationPrevRef = useRef();
  const navigationNextRef = useRef();
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="border-b cursor-pointer hover:shadow-lg transition duration-200 ease-out py-7 first:border-t sm:first:border-t-0">
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="relative w-full"
      >
        <div
          ref={scrollRef}
          className=" w-full overflow-y-hidden overflow-x-scroll scrollbar-hide flex"
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={
              false || {
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }
            }
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src={img || DEFAULT_IMAGE_PATH}
                onClick={() => navigate(`/RoomDetail/${id}`)}
                alt={`ảnh ${location}`}
                className="object-cover rounded-xl w-full  transition-all duration-300 h-[300px]"
                style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
              />
            </SwiperSlide>
            {fakeDataImages.map((item, index) => (
              <SwiperSlide>
                <img
                  key={item.id}
                  onClick={() => navigate(`/RoomDetail/${id}`)}
                  className="object-cover rounded-xl w-full  transition-all duration-300 h-[300px]"
                  alt="hinh mo ta"
                  src={item.img}
                  style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
                />
              </SwiperSlide>
            ))}
            <ArrowLeft
              ref={navigationPrevRef}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "2rem",
                left: 0,
              }}
              className={`absolute bg-slate-50 text-primary rounded-full z-50 ${
                isShown ? "opacity-100" : "opacity-0"
              }`}
            />
            <ArrowRight
              ref={navigationNextRef}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "2rem",
                right: 0,
              }}
              className={`absolute bg-slate-50 text-primary rounded-full z-50 ${
                isShown ? "opacity-100" : "opacity-0"
              }`}
            />
          </Swiper>
        </div>
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

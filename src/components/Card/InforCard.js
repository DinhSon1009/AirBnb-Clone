import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";
import { fakeDataImages } from "../../assets/images/fakeDataImage";
// import useEventListener from "../../Hooks/useEventListener/useEventListener";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartIcon,
  StarIcon,
} from "../../assets/icons";
import useWindowSize from "../../Hooks/useWindowResize/useWindowResize";
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
  FlexView,
}) {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const navigationPrevRef = useRef();
  const navigationNextRef = useRef();
  const [isShown, setIsShown] = useState(false);
  const [hoverParent, setHoverParent] = useState(false);
  const [breakPoint, setBreakPoint] = useState();

  const handleShowNavigation = (index) => {
    if (index === 0) {
      navigationPrevRef.current.style.display = "none";
      navigationNextRef.current.style.display = "flex";
    } else if (index === 6) {
      navigationPrevRef.current.style.display = "flex";
      navigationNextRef.current.style.display = "none";
    } else {
      navigationPrevRef.current.style.display = "flex";
      navigationNextRef.current.style.display = "flex";
    }
  };

  const { width } = useWindowSize();

  useEffect(() => {
    width >= 1536 && setBreakPoint("2xl");
    width >= 1280 && setBreakPoint("xl");
    width >= 1024 && setBreakPoint("lg");
    width >= 768 && setBreakPoint("md");
    width >= 640 && setBreakPoint("sm");
    width < 640 && setBreakPoint("mobile");
  }, [width]);

  return (
    <div
      onMouseEnter={() => setHoverParent(true)}
      onMouseLeave={() => setHoverParent(false)}
      className={`border-b cursor-pointer hover:shadow-lg transition duration-200 ease-out py-7 first:border-t sm:first:border-t-0 pt-0 ${
        FlexView &&
        "!border-t-0 min-w-[250px] lg:min-w-[calc(25%_-_0.9375rem)] md:min-w-[calc(100%/3_-_2.5rem/3)]"
      }`}
    >
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="relative w-full"
      >
        <div
          ref={scrollRef}
          className=" w-full overflow-y-hidden overflow-x-scroll scrollbar-hide flex rounded-xl overflow-hidden"
        >
          <Swiper
            onClick={() => navigate(`/RoomDetail/${id}`)}
            slidesPerView={1}
            spaceBetween={0}
            loop={false}
            onSlideChange={(swiper) => {
              console.log(swiper.activeIndex);
              handleShowNavigation(swiper.activeIndex);
            }}
            grabCursor={!FlexView && true}
            pagination={{
              clickable: false,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onInit={(swiper) => {
              if (!FlexView) {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                navigationPrevRef.current.style.display = "none";
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            modules={FlexView ? [] : [Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide
              style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
            >
              <img
                src={img || DEFAULT_IMAGE_PATH}
                alt={`ảnh ${location}`}
                className={`object-cover  w-full  transition-all duration-300 h-[300px] ${
                  FlexView && "h-[205px]"
                }`}
                style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
              />
            </SwiperSlide>
            {!FlexView &&
              fakeDataImages.map((item, index) => (
                <SwiperSlide
                  style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
                  key={index}
                >
                  <img
                    key={item.id}
                    className="object-cover  w-full  transition-all duration-300 h-[300px]"
                    alt="hinh mo ta"
                    src={item.img}
                    style={{ minWidth: `${scrollRef.current?.clientWidth}px` }}
                  />
                </SwiperSlide>
              ))}
            {!FlexView && (
              <>
                <div
                  ref={navigationPrevRef}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    left: 0,
                  }}
                  className={`w-8 h-8 bg-white rounded-full z-10 flex items-center justify-center hover:opacity-100 transition ml-2
              ${isShown ? "opacity-90" : "opacity-0"}
              `}
                >
                  <ArrowLeftIcon
                    className={`z-11 text-[rgb(34,34,34)] hover:opacity-100 w-3 h-3 stroke-current stroke-[4] 
                `}
                  />
                </div>
                <div
                  ref={navigationNextRef}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    right: 0,
                  }}
                  className={`w-8 h-8 bg-white rounded-full z-10 flex items-center justify-center hover:opacity-100 mr-2
              ${isShown ? "opacity-90" : "opacity-0"}
              `}
                >
                  <ArrowRightIcon className="z-50 text-[rgb(34,34,34)] hover:opacity-100 w-3 h-3 stroke-current stroke-[4]" />
                </div>
              </>
            )}
          </Swiper>
        </div>
        <HeartIcon
          fill="rgba(0, 0, 0, 0.5)"
          className="absolute top-2 right-2 w-7 text-white z-10 stroke-2 stroke-white	"
        />
      </div>

      <div className="flex flex-col space-y-1 px-2">
        <div className="flex items-center justify-between">
          <h4 className="text-lg text-title font-medium mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {title}
          </h4>
          <div className="flex items-center">
            <span>4,97</span>
            <span className="ml-1">
              <StarIcon className={`${FlexView && "text-primary"}`} />
            </span>
          </div>
        </div>
        <p className="m-0">{location}</p>
        <p className="text-sm text-gray-500 flex-grow m-0">
          {guests} guests - {bedRoom} bedrooms - {bath} baths
        </p>
        <p
          className={`text-lg lg:text-lg font-semibold text-title 
         ${hoverParent && "text-primary"}`}
        >
          ${price.toLocaleString()}
          <span className="font-light">/đêm</span>
        </p>
      </div>
    </div>
  );
}

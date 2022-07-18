import { useEffect, useRef } from "react";
import Banner from "../../components/Banner/Banner";
import SmallCard from "../../components/Card/SmallCard";
import Footer from "../../components/Footer/Footer";
import { useTitle } from "../../Hooks/useTitle/useTitle";
import { useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartIcon,
  StarIcon,
} from "../../assets/icons";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";
import { useDispatch } from "react-redux";
import { setOffset, setSearchInfo } from "../../redux/navbarSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Home({ locations }) {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOffset(false));
    dispatch(setSearchInfo(null));
    const onScroll = () => {
      window.pageYOffset > 0
        ? dispatch(setOffset(true))
        : dispatch(setOffset(false));
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      dispatch(setOffset(undefined));
    };
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    direction === "left"
      ? (current.scrollLeft -= current.clientWidth + 20)
      : (current.scrollLeft += current.clientWidth + 20);
  };

  useTitle("Airbnb homepage");
  return (
    <>
      <Banner />
      <main className="dscontainer  mx-auto py-5  space-y-6 ">
        <section>
          <h2 className="text-2xl font-semibold pb-5">
            Cảm hứng cho chuyến đi tiếp theo của bạn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {locations?.map(
              (location, index) =>
                index < 8 && (
                  <SmallCard
                    key={location.locationId}
                    locationId={location.locationId}
                  />
                )
            )}
          </div>
        </section>
        <section className="relative">
          <h2 className="text-2xl font-semibold ">
            Khám phá trải nghiệm AirBnb tại {locations && locations[0].location}
          </h2>
          <p className="m-0 pb-5 text-base text-gray-600">
            Những giấc mơ đẹp đang chờ đợi bạn.
          </p>
          <div
            ref={scrollRef}
            className="FlexView flex gap-5 overflow-x-scroll scrollbar-hide py-6 scroll-smooth "
          >
            {locations &&
              locations[0].data.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/RoomDetail/${item._id}`)}
                  className="border-b cursor-pointer hover:shadow-lg transition duration-200 ease-out py-7 pt-0 
                !border-t-0 min-w-[250px] lg:min-w-[calc(25%_-_0.9375rem)] md:min-w-[calc(100%/3_-_2.5rem/3)] "
                >
                  <div className="relative w-full">
                    <div className=" w-full overflow-y-hidden overflow-x-scroll scrollbar-hide flex rounded-xl overflow-hidden">
                      <LazyLoadImage
                        src={item.image || DEFAULT_IMAGE_PATH}
                        alt={`ảnh ${`${item.locationId.name}, ${item.locationId.province}`}`}
                        className="object-cover  w-full  transition-all duration-300 
                            h-[205px]"
                      />
                    </div>
                    <HeartIcon
                      fill="rgba(0, 0, 0, 0.5)"
                      className="absolute top-2 right-2 w-7 text-white z-10 stroke-2 stroke-white	"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 px-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg text-title font-medium mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {item.name}
                      </h4>
                      <div className="flex items-center">
                        <span>4,97</span>
                        <span className="ml-1">
                          <StarIcon className="text-primary" />
                        </span>
                      </div>
                    </div>
                    <p className="m-0">
                      {item.locationId.name}, {item.locationId.province}
                    </p>
                    <p className="text-sm text-gray-500 flex-grow m-0">
                      {item.guests} guests - {item.bedRoom} bedrooms -{" "}
                      {item.bath} baths
                    </p>
                    <p className="text-lg lg:text-lg font-semibold text-title">
                      {item.price.toLocaleString()}
                      <span className="font-light">/đêm</span>
                    </p>
                  </div>
                </div>
              ))}
            <div className="absolute  top-20 sm:top-10 right-0  items-center gap-2 hidden sm:flex">
              <button
                onClick={() => scroll("left")}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center cursor-pointer transform transition hover:scale-105 "
              >
                <ArrowLeftIcon className="text-[rgb(34,34,34)]" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center cursor-pointer transform transition hover:scale-105  "
              >
                <ArrowRightIcon className="text-[rgb(34,34,34)]" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

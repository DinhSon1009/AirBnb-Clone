import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import SmallCard from "../../components/Card/SmallCard";
import nearByData from "../../fixtures/nearby.json";
// import exploreData from "../../fixtures/explore.json";
// import BigCard from "../../components/Card/BigCard";
import Footer from "../../components/Footer/Footer";
import { useTitle } from "../../Hooks/useTitle/useTitle";
import httpServ from "../../services/http.service";
import { useNavigate } from "react-router";
// import Skeleton from "react-loading-skeleton";
import InforCard from "../../components/Card/InforCard";
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/icons";

export default function Home() {
  const [offset, setOffset] = useState(false);
  const scrollRef = useRef();
  useEffect(() => {
    const onScroll = () => {
      window.pageYOffset > 0 ? setOffset(true) : setOffset(false);
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    httpServ
      .layDanhSachPhongChoThueTheoViTri("61695437efe193001c0a5b51")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => navigate("/notfound"));
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    direction === "left"
      ? (current.scrollLeft -= current.clientWidth + 20)
      : (current.scrollLeft += current.clientWidth + 20);
  };

  console.log(scrollRef.current.scrollWidth);

  useTitle("Airbnb homepage");
  return (
    <div className="">
      <Header offset={offset} />
      <Banner />
      <main className="dscontainer  mx-auto py-5  space-y-6 ">
        <section>
          <h2 className="text-2xl font-semibold pb-5">
            Cảm hứng cho chuyến đi tiếp theo của bạn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {nearByData.map((item) => (
              <SmallCard
                key={item.id}
                img={item.img}
                distance={item.distance}
                location={item.location}
                locationId={item.locationId}
              />
            ))}
          </div>
        </section>
        <section className="relative">
          {/* <h2 className="text-2xl font-semibold pb-5">
            Khám phá trải nghiệm AirBnb
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exploreData.map((item) => (
              <BigCard img={item.img} key={item.id} content={item.content} />
            ))}
          </div> */}
          <h2 className="text-2xl font-semibold ">
            Khám phá trải nghiệm AirBnb tại Cầu Sông Hàn, Đà Nẵng
          </h2>
          <p className="m-0 pb-5 text-base text-gray-600">
            Những giấc mơ đẹp đang chờ đợi bạn.
          </p>
          <div
            ref={scrollRef}
            className="FlexView flex gap-5 overflow-x-scroll scrollbar-hide py-6 scroll-smooth "
          >
            {data?.map((item) => (
              <InforCard
                key={item._id}
                id={item._id}
                img={item.image}
                location={`${item.locationId.name}, ${item.locationId.province}`}
                title={item.name}
                guests={item.guests}
                bedRoom={item.bedRoom}
                bath={item.bath}
                price={item.price}
                FlexView
              />
            ))}
            <div className="absolute  top-20 sm:top-10 right-0  items-center gap-2 hidden sm:flex ">
              <div
                onClick={() => scroll("left")}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                <ArrowLeftIcon className="text-[rgb(34,34,34)]" />
              </div>
              <div
                onClick={() => scroll("right")}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center cursor-pointer "
              >
                <ArrowRightIcon className="text-[rgb(34,34,34)]" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

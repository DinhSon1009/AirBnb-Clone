import React from "react";
import { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import SmallCard from "../../components/Card/SmallCard";
import nearByData from "../../fixtures/nearby.json";
import exploreData from "../../fixtures/explore.json";
import BigCard from "../../components/Card/BigCard";
import Footer from "../../components/Footer/Footer";
import localStorageServ from "../../services/localStorage.service";
export default function Home() {
  const [offset, setOffset] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      window.pageYOffset > 0 ? setOffset(true) : setOffset(false);
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold pb-5">
            Khám phá trải nghiệm AirBnb
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exploreData.map((item) => (
              <BigCard img={item.img} key={item.id} content={item.content} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

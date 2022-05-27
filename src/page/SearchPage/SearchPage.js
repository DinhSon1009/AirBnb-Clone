import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import InforCard from "../../components/Card/InforCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTitle } from "../../Hooks/useTitle/useTitle";
// import Map from "../../components/Map/Map";
import httpServ from "../../services/http.service";
import { Button } from "../../styles/customStyle";
import Skeleton from "react-loading-skeleton";

export default function SearchPage() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  const [location, setLocation] = useState("");
  let locationID = useSelector((state) => state.searchReducer.locationID);
  const [room, setRoom] = useState([]);
  const searchInfo = useSelector((state) => state.searchReducer.searchInfo);
  const isLoading = useSelector(
    (state) => state.spinnerReducer.spinner && state.spinnerReducer.flag
  );
  const navigate = useNavigate();

  useTitle("Kết quả tìm kiếm");
  useEffect(() => {
    httpServ
      .layDanhSachPhongChoThueTheoViTri(id)
      .then((res) => {
        setRoom(res.data);
      })
      .catch((err) => navigate("/notfound"));
    return () => window.scrollTo(0, 0);
  }, [locationID]);

  useEffect(() => {
    httpServ
      .layThongTinChiTietViTri(id)
      .then((res) => {
        setLocation(`${res.data.name},${res.data.province}`);
      })
      .catch((err) => console.log(err));
  }, [locationID]);

  return (
    <div className="">
      <Header searchInfo={searchInfo} />
      <main className="dscontainer flex pt-5">
        <section className="flex-grow ">
          <p className="text-xs">300+ Stays for 5 numbers of guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {!isLoading ? `Stays in ${location}` : <Skeleton />}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <Button> Cancellation Flexibility</Button>
            <Button> Type of Place</Button>
            <Button> Price</Button>
            <Button> Rooms and Beds</Button>
            <Button> More filters</Button>
          </div>
          <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {!isLoading
              ? room?.map((item) => (
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
                  />
                ))
              : Array(8)
                  .fill(0)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="first:border-t sm:first:border-t-0 hover:shadow-lg cursor-pointer border-b hover:opacity-80 transition duration-200 py-7 ease-out"
                    >
                      <Skeleton count={1} height={210} />
                      <h4 className="text-lg font-medium mt-2">
                        <Skeleton count={1} />
                      </h4>
                      <p>
                        <Skeleton count={3} />
                      </p>
                    </div>
                  ))}
          </div>
        </section>
        {/* <section className="min-w-[600px] ">
          <Map />
        </section> */}
      </main>
      <Footer />
    </div>
  );
}

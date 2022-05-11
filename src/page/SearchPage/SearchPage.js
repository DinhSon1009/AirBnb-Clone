import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InforCard from "../../components/Card/InforCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
// import Map from "../../components/Map/Map";
import httpServ from "../../services/http.service";
import { Button } from "../../styles/customStyle";

export default function SearchPage() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  let locationID = useSelector((state) => state.searchReducer.locationID);
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState([]);
  useEffect(() => {
    httpServ
      .layDanhSachPhongChoThueTheoViTri(id)
      .then((res) => {
        setRoom(res.data);
      })
      .catch((err) => console.log(err));
  }, [locationID]);

  useEffect(() => {
    httpServ
      .layThongTinChiTietViTri(id)
      .then((res) => {
        setLocation(res.data.province);
      })
      .catch((err) => console.log(err));
  }, [locationID]);

  return (
    <div className="">
      <Header />
      <main className="dscontainer flex pt-5">
        <section className="flex-grow ">
          <p className="text-xs">300+ Stays for 5 numbers of guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <Button> Cancellation Flexibility</Button>
            <Button> Type of Place</Button>
            <Button> Price</Button>
            <Button> Rooms and Beds</Button>
            <Button> More filters</Button>
          </div>
          <div className="flex flex-col">
            {room?.map((item) => (
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

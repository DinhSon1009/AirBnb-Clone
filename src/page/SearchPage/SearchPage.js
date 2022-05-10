import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InforCard from "../../components/Card/InforCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { setRoomList } from "../../redux/searchSlice";
import httpServ from "../../services/http.service";
import { Button } from "../../styles/customStyle";

export default function SearchPage() {
  let roomList = useSelector((state) => state.searchReducer.roomList);
  var urlParams = new URLSearchParams(window.location.search);
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
        console.log(res.data.province);
      })
      .catch((err) => console.log(err));
  }, [locationID]);

  return (
    <div className="">
      <Header />
      <main className="dscontainer flex pt-14 px-6">
        <section className="flex-grow">
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
      </main>
      <Footer />
    </div>
  );
}

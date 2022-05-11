import DatePicker from "../../components/DatePicker/DatePicker";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import httpServ from "../../services/http.service";
import { useSelector } from "react-redux";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";

export default function RoomDetail() {
  let id = window.location.pathname.replace("/RoomDetail/", "");
  const checkoutRef = useRef();
  const [room, setRoom] = useState();
  const [calendar, setCalendar] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const button1Selected = useSelector(
    (state) => state.roomReducer.button1Selected
  );
  const startDate = useSelector((state) => state.roomReducer.startDate);
  const endDate = useSelector((state) => state.roomReducer.endDate);
  useEffect(() => {
    httpServ
      .layThongTinChiTietPhong(id)
      .then((res) => {
        setRoom(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const { target } = event;
      if (checkoutRef.current && !checkoutRef.current.contains(target)) {
        console.log("clicked outside");
        setCalendar(false);
        setButton1(false);
        setButton2(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleClick1 = () => {
    setButton1(true);
    setCalendar(true);
  };
  const handleClick2 = () => {
    setButton2(true);
    setCalendar(true);
  };
  return (
    <>
      <Header />
      <main className="dscontainer pt-5">
        <h4 className="text-xl">{room?.name}</h4>
        <section className="flex flex-col md:flex-row">
          <div className="basis-1/2 flex-shrink-0">
            <img
              className="w-full object-cover rounded-2xl "
              src={room?.image}
              alt="room"
            />
          </div>
          <div className="flex flex-col basis-1/2 p-0 pt-2 md:pt-0 pl-0 md:pl-5">
            <div className=" ">
              <h4 className="text-xl m-0">Nhận xét từ khách hàng</h4>
              <p className="border rounded-md p-5 mt-2 text-gray-600">
                {room?.description}
              </p>
              <p className="pt-2 text-sm text-gray-600 flex-grow">
                {room?.guests} guests - {room?.bedRoom} bedrooms - {room?.bath}{" "}
                baths
              </p>
              <p className="pt-2 text-sm text-gray-600 flex-grow">
                {room?.wifi && "wifi"} - {room?.pool && "hồ bơi"} -{" "}
                {room?.kitchen && "nhà bếp"} - {room?.cableTV && "Tivi"}
              </p>
            </div>
            <div className="flex my-5">
              <div className="w-full border rounded-md border-gray-300 shadow-xl p-5">
                <p className="text-lg lg:text-2xl font-semibold px-5 ">
                  {room?.price.toLocaleString()} đ/đêm
                </p>
                <div ref={checkoutRef} className="flex glass relative pt-2">
                  <button
                    onClick={handleClick1}
                    className={`border-r basis-1/2 text-left px-5 ${
                      button1 && "border-gray-500 border"
                    }`}
                  >
                    <h4>CHECK-IN</h4>
                    <p>{startDate === null ? "Add date" : startDate}</p>
                  </button>
                  <button
                    disabled={!button1Selected}
                    onClick={handleClick2}
                    className={`basis-1/2 border-l text-left px-5 ${
                      button1Selected ? "cursor-pointer" : "cursor-not-allowed"
                    } ${button2 && "border-gray-500 border"} `}
                  >
                    <h4>CHECK-OUT</h4>
                    <p>{endDate === null ? "Add date" : endDate}</p>
                  </button>
                  <div className="absolute top-full ">
                    {calendar && <DatePicker />}
                  </div>
                </div>
                <div className="w-full relative z-0 ">
                  <div className="p-5 flex items-center justify-between w-full">
                    <div className="">
                      <h4>GUESTS</h4>
                      <p>1 guest</p>
                    </div>
                    <div className="flex">
                      <MinusCircleIcon className="text-gray-500 h-8 w-8 cursor-pointer" />
                      <PlusCircleIcon className="text-gray-500 h-8 w-8 cursor-pointer  " />
                    </div>
                  </div>
                </div>
                <div className="text-center w-full">
                  <button className="w-3/4 bg-red-500 hover:bg-red-600 transition-all duration-150 py-4 px-6 rounded-full text-white text-xl">
                    Book now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

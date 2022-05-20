import DatePicker from "../../components/DatePicker/DatePicker";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import httpServ from "../../services/http.service";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import Rating from "../../components/Rating/Rating";
import useClickOutside from "../../Hooks/useClickOutside/useCLickOutside";
import { message } from "antd";
import { useParams } from "react-router";
import { setUserToStorage } from "../../redux/userSlice";
import { setEndDateBooking, setStartDateBooking } from "../../redux/roomSlice";
import { Kitchen, Pool, Tv, Wifi } from "@mui/icons-material";
import { useTitle } from "../../Hooks/useTitle/useTitle";

export default function RoomDetail() {
  // let id = window.location.pathname.replace("/RoomDetail/", "");
  const { id } = useParams();
  const checkoutRef = useRef();
  const [room, setRoom] = useState();
  const [calendar, setCalendar] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const button1Selected = useSelector(
    (state) => state.roomReducer.button1Selected
  );
  const user = useSelector((state) => state.userReducer.user);
  const startDate = useSelector((state) => state.roomReducer.startDate);
  const endDate = useSelector((state) => state.roomReducer.endDate);
  const [guests, setGuests] = useState(1);
  const [roomServices, setRoomSerVices] = useState();
  const [danhGia, setDanhGia] = useState();
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  // console.log(startDate);

  useTitle("Chi tiết phòng");
  useEffect(() => {
    httpServ
      .layThongTinChiTietPhong(id)
      .then((res) => {
        setRoom(res.data);
        setRoomSerVices([
          {
            isTrue: res.data.wifi,
            icon: <Wifi />,
            name: "Wifi",
          },
          {
            isTrue: res.data.cableTV,
            icon: <Tv />,
            name: "Tv",
          },
          {
            isTrue: res.data.pool,
            icon: <Pool />,
            name: "Hồ bơi",
          },
          {
            isTrue: res.data.kitchen,
            icon: <Kitchen />,
            name: "Nhà bếp",
          },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  useClickOutside(checkoutRef, () => {
    setCalendar(false);
    setButton1(false);
    setButton2(false);
  });
  const handleBooking = () => {
    if (!user) {
      message.info("Vui lòng đăng nhập !");
    } else {
      if (!startDate || !endDate) {
        message.info("Chọn ngày để đặt vé !");
        return;
      } else {
        const data = {
          roomID: room._id,
          checkIn: startDate,
          checkOut: endDate,
        };
        httpServ
          .datPhongChoThue(data)
          .then((res) => {
            dispatch(setUserToStorage(res.data.userDetail));
            dispatch(setStartDateBooking(null));
            dispatch(setEndDateBooking(null));
            message.success("Đặt phòng thành công !");
          })
          .catch((err) => message.error("Đặt phòng thất bại !"));
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      let comment = { content: e.target.value };
      httpServ
        .taoDanhGia(id, comment)
        .then((res) => {
          setDanhGia(res.data.content);
          setTextInput("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Header />
      <main className="dscontainer pt-5">
        <h4 className="text-xl">{room?.name}</h4>
        <section className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="basis-1/2 flex-shrink-0 ">
            <img
              className="w-full object-cover rounded-2xl "
              src={room?.image}
              alt="room"
            />
          </div>
          <div className="md:pt-0 md:pl-5">
            <h4 className="text-xl m-0">Nhận xét từ khách hàng</h4>
            <p className="border rounded-md p-5 mt-2 text-gray-600">
              {room?.description}
            </p>
            <p className="pt-2 text-sm text-gray-600 flex-grow">
              {room?.guests} guests - {room?.bedRoom} bedrooms - {room?.bath}{" "}
              baths
            </p>
            <div className="flex pt-2 text-sm text-gray-600 space-x-2 items-center">
              {roomServices?.map((service, index) => (
                <React.Fragment key={index}>
                  {service.isTrue && (
                    <div className="flex space-x-1">
                      {service.icon}
                      <span className="font-semibold">{service.name}</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div
            ref={checkoutRef}
            className="flex my-5 overflow-x-scroll md:pt-0 md:col-span-2 max-w-[600px] scrollbar-hide "
          >
            <div className=" border rounded-md border-gray-300 shadow-xl p-5 w-full">
              <p className="text-lg lg:text-2xl font-semibold px-5 ">
                {room?.price.toLocaleString()} đ/đêm
              </p>
              <div className="flex flex-col glass relative pt-2">
                <div className="flex">
                  <button
                    onClick={() => {
                      setButton1(true);
                      setCalendar(!calendar);
                    }}
                    className={`border-r basis-1/2 text-left px-5 ${
                      button1 && "border-gray-500 border"
                    }`}
                  >
                    <h4>CHECK-IN</h4>
                    <p>{startDate === null ? "Add date" : startDate}</p>
                  </button>
                  <button
                    disabled={!button1Selected}
                    onClick={() => {
                      setButton2(true);
                      setCalendar(!calendar);
                    }}
                    className={`basis-1/2 border-l text-left px-5  ${
                      button1Selected ? "cursor-pointer" : "cursor-not-allowed"
                    } ${button2 && "border-gray-500 border"} `}
                  >
                    <h4>CHECK-OUT</h4>
                    <p>{endDate === null ? "Add date" : endDate}</p>
                  </button>
                </div>
                {calendar && <DatePicker />}
              </div>
              <div className="w-full relative z-0 ">
                <div className="p-5 flex items-center justify-between w-full">
                  <div className="">
                    <h4>GUESTS</h4>
                    <p>{guests} guest</p>
                  </div>
                  <div className="flex">
                    <MinusCircleIcon
                      onClick={() =>
                        guests > 1 && setGuests((guests) => guests - 1)
                      }
                      className="text-gray-500 h-8 w-8 cursor-pointer"
                    />
                    <PlusCircleIcon
                      onClick={() =>
                        guests < room.guests &&
                        setGuests((guests) => guests + 1)
                      }
                      className="text-gray-500 h-8 w-8 cursor-pointer  "
                    />
                  </div>
                </div>
              </div>
              <div className="text-center w-full">
                <button
                  onClick={handleBooking}
                  className="w-3/4 bg-red-500 hover:bg-red-600 transition-all duration-150 py-4 px-6 rounded-full text-white text-xl"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section className="py-4 bg-gray-100">
        <div className=" p-6 shadow-sm dscontainer">
          <h4 className="mb-5 text-xl">Nhận xét từ người dùng :</h4>
          {user && (
            <div className="flex mb-4">
              <div className="w-16">
                {user.avatar ? (
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src={user?.avatar}
                    alt=""
                  />
                ) : (
                  <UserCircleIcon className="rounded-full w-12 h-12" />
                )}
              </div>
              <div className="flex-grow">
                <h4>{user?.name || user?.email.split("@")[0]}</h4>
                <textarea
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setTextInput(e.target.value)}
                  value={textInput}
                  className="w-full h-28 border-2 outline-1 outline-blue-300 p-4"
                  placeholder="Leave a comment here"
                ></textarea>
              </div>
            </div>
          )}
          <Rating roomID={id} danhGia={danhGia} />
        </div>
      </section>
      <Footer />
    </>
  );
}

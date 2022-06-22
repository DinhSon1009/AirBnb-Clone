import DatePicker from "../../components/DatePicker/DatePicker";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import httpServ from "../../services/http.service";
import { useSelector } from "react-redux";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon, UploadIcon } from "@heroicons/react/solid";
import Rating from "../../components/Rating/Rating";
import { useParams } from "react-router";
import { ChevronRight } from "@mui/icons-material";
import { useTitle } from "../../Hooks/useTitle/useTitle";
import Skeleton from "react-loading-skeleton";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";
import { fakeDataImages } from "../../assets/images/fakeDataImage";
import { Button } from "../../styles/customStyle";
import DatVe from "../../components/DatVe/DatVe";
import {
  CableTvIcon,
  CalendarIcon,
  DryerIcon,
  ElevatorIcon,
  EntranceIcon,
  GymIcon,
  HeatingIcon,
  HotTubIcon,
  IndoorFirePlaceIcon,
  KeyIcon,
  KitchenIcon,
  PoolIcon,
  UserIcon,
  WifiIcon,
} from "../../assets/icons";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState();
  const user = useSelector((state) => state.userReducer.user);
  const [roomServices, setRoomSerVices] = useState();
  const [danhGia, setDanhGia] = useState();
  const [textInput, setTextInput] = useState("");
  const isLoading = useSelector(
    (state) => state.spinnerReducer.spinner && state.spinnerReducer.flag
  );
  const { startDatePick, endDatePick } = useSelector(
    (state) => state.datePickerReducer
  );
  const dayCount =
    new Date(endDatePick).getUTCDate() -
    new Date(startDatePick).getUTCDate() +
    1;

  useTitle("Chi tiết phòng");

  useEffect(() => {
    httpServ
      .layThongTinChiTietPhong(id)
      .then((res) => {
        setRoom(res.data);
        setRoomSerVices([
          {
            isTrue: res.data.wifi,
            icon: <WifiIcon className="w-5 h-5" />,
            name: "Wifi",
          },
          {
            isTrue: res.data.cableTV,
            icon: <CableTvIcon className="w-5 h-5" />,
            name: "CableTV",
          },
          {
            isTrue: res.data.pool,
            icon: <PoolIcon className="w-5 h-5" />,
            name: "Pool",
          },
          {
            isTrue: res.data.elevator,
            icon: <ElevatorIcon className="w-5 h-5" />,
            name: "Elevator",
          },
          {
            isTrue: res.data.hotTub,
            icon: <HotTubIcon className="w-5 h-5" />,
            name: "HotTub",
          },
          {
            isTrue: res.data.heating,
            icon: <HeatingIcon className="w-5 h-5" />,
            name: "Heating",
          },
          {
            isTrue: res.data.indoorFireplace,
            icon: <IndoorFirePlaceIcon className="w-5 h-5" />,
            name: "IndoorFireplace",
          },
          {
            isTrue: res.data.kitchen,
            icon: <KitchenIcon className="w-5 h-5" />,
            name: "Kitchen",
          },
          {
            isTrue: res.data.dryer,
            icon: <DryerIcon className="w-5 h-5" />,
            name: "Dryer",
          },
          {
            isTrue: res.data.gym,
            icon: <GymIcon className="w-5 h-5" />,
            name: "Gym",
          },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <section>
          <h1 className="text-2xl text-title w-full font-semibold lg:w-96">
            {isLoading ? <Skeleton /> : room?.name}
          </h1>
          <div className="flex flex-col md:flex-row justify-between  md:items-center">
            <div className="flex items-center">
              <StarIcon className="w-6 inline-flex " />
              <span className="font-semibold">4.97 ·</span>
              <span className="underline font-medium ml-1 p-2 cursor-pointer">
                240 reviews
              </span>
              <span className="ml-2 mr-2">·</span>
              <span className="underline font-medium p-2 cursor-pointer">
                Việt Nam
              </span>
            </div>
            <div className="flex items-center  ">
              <div className="flex items-center p-2 cursor-pointer hover:bg-gray-200">
                <UploadIcon className="w-6" />
                <span className="underline font-medium p-2">Chia sẻ</span>
              </div>
              <div className="flex items-center p-2 cursor-pointer hover:bg-gray-200">
                <HeartIcon className="w-6" />
                <span className="underline font-medium p-2">Lưu</span>
              </div>
            </div>
          </div>

          {/* photos grid  */}

          <div className="md:grid block md:grid-cols-[1fr_0.5fr_0.5fr] h-[500px] max-h-[calc(60vh_-_64px)] grid-rows-2 gap-2 relative pt-6">
            <div className="md:row-span-2 w-full h-full cursor-pointer relative after:absolute after:inset-0 after:w-full after:h-full after:bg-[rgba(0,0,0,1)] after:opacity-0 hover:after:opacity-20 after:transition-all after:duration-300 rounded-lg md:rounded-l-lg md:rounded-r-none overflow-hidden ">
              <img
                className="w-full h-full object-cover "
                src={room?.image || DEFAULT_IMAGE_PATH}
                alt=""
              />
            </div>
            {fakeDataImages.map(
              (item, index) =>
                index < 4 && (
                  <div
                    className={`invisible md:visible row-span-1 cursor-pointer relative after:absolute after:inset-0 after:w-full after:h-full after:bg-[rgba(0,0,0,1)] after:opacity-0 hover:after:opacity-20 after:transition-all after:duration-300 overflow-hidden 
                    ${index === 1 && "rounded-tr-lg"}
                    ${index === 3 && "rounded-br-lg"}
                    `}
                    key={item.id}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={item.img}
                      alt="anh mo ta"
                    />
                  </div>
                )
            )}
            {/* button show all photos  */}
            <div className="absolute right-6 bottom-6 z-10">
              <Button
                className="flex items-center cursor-pointer font-semibold outline-none bg-white border border-gray-700 rounded-lg relative after:absolute after:inset-0 after:w-full after:h-full after:bg-gray-500 after:opacity-0 hover:after:opacity-10 after:transition-all after:duration-300 "
                style={{ padding: "7px 15px" }}
              >
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "16px",
                    width: "16px",
                    fill: "currentcolor",
                  }}
                >
                  <path
                    d="m3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-2">Show all photos</span>
              </Button>
            </div>

            {/* end button show all photos  */}
          </div>
        </section>
        <section className="pt-12 pb-6">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5">
              <div className="border-b">
                <h2 className="text-base">Phòng riêng tại nhà. Chủ nhà Son</h2>
                <ol className="">
                  <li className="inline-block">
                    <span className="text-base">{room?.guests} khách</span>
                  </li>
                  <li className="inline-block">
                    <span className="text-base p-1">·</span>
                  </li>
                  <li className="inline-block">
                    <span className="text-base">{room?.bedRoom} phòng ngủ</span>
                  </li>
                  <li className="inline-block">
                    <span className="text-base p-1">·</span>
                  </li>
                  <li className="inline-block">
                    <span className="text-base">1 giường</span>
                  </li>
                  <li className="inline-block">
                    <span className="text-base p-1">·</span>
                  </li>
                  <li className="inline-block">
                    <span className="text-base">
                      {room?.bath} phòng tắm đầy đủ và 1 phòng vệ sinh cơ bản
                    </span>
                  </li>
                </ol>
              </div>

              <div className="pt-8 pb-8 border-b">
                <div className="flex mb-6">
                  <div>
                    <EntranceIcon />
                  </div>
                  <div className="ml-4">
                    <h1 className="mb-1 text-base font-semibold">
                      Tự nhận phòng
                    </h1>
                    <span>Tự nhận phòng bằng khóa thông minh.</span>
                  </div>
                </div>
                <div className="flex mb-6">
                  <div>
                    <KeyIcon />
                  </div>
                  <div className="ml-4">
                    <h1 className="mb-1 text-base font-semibold">
                      Trải nghiệm nhận phòng tuyệt vời{" "}
                    </h1>
                    <span>
                      100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận
                      phòng.
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex mb-6">
                    <div>
                      <CalendarIcon />
                    </div>
                    <div className="ml-4">
                      <h1 className="mb-1 text-base font-semibold">
                        Hủy miễn phí trước 3 thg 5.
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 pb-12 ">
                <span className="text-base">
                  {room?.description ||
                    " The hotel staff are amazing, helpful and friendly."}
                </span>
                <div className="flex cursor-pointer mt-4">
                  <h1 className="underline text-base font-semibold">
                    Hiển thị thêm
                  </h1>
                  <ChevronRight className="ml-1" />
                </div>
              </div>

              {/* room equipment  */}
              <div className="pt-12 pb-12 border-t">
                <h1 className="text-2xl font-semibold pb-6">
                  Nơi này có những gì cho bạn
                </h1>
                <div>
                  {roomServices?.map((service, index) => (
                    <React.Fragment key={index}>
                      {service.isTrue && (
                        <div className="w-1/2 md:w-1/3 inline-flex items-center pb-4">
                          <div className="mr-4"> {service.icon}</div>
                          <span className="text-base">{service.name}</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="border-t pt-12 pb-12">
                <h1 className="text-2xl font-semibold pb-6">
                  {dayCount} đêm tại {room?.name}
                </h1>
                <div>
                  <DatePicker />
                </div>
              </div>

              {/* here is a left div container  */}
            </div>
            <div className="w-full lg:w-2/5 ml-0 lg:ml-[8.333333%] relative">
              <DatVe room={room} />
            </div>
          </div>
        </section>
      </main>

      {/* user comment  */}
      <section className="py-4 bg-gray-100">
        <div className=" p-6 shadow-sm dscontainer">
          <h4 className="mb-5 text-xl">Nhận xét từ người dùng :</h4>
          {user && (
            <div className="flex mb-4">
              <div className="w-12 mr-2  ">
                {user.avatar ? (
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src={user?.avatar}
                    alt=""
                  />
                ) : (
                  <UserIcon />
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

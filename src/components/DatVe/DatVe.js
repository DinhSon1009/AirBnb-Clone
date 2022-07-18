import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Modal } from "antd";
import "./DatVe.css";
import DatePicker from "../DatePicker/DatePicker";
import useClickOutside from "../../Hooks/useClickOutside/useCLickOutside";
import { MinusIcon, PlusIcon } from "../../assets/icons";
import { toast } from "react-toastify";
import httpServ from "../../services/http.service";
import { setUserToStorage } from "../../redux/userSlice";
import { addDays } from "date-fns";
import {
  setEndDatePicker,
  setStartDatePicker,
} from "../../redux/datePickerSlice";
export default function DatVe({ room }) {
  const { startDatePick, endDatePick } = useSelector(
    (state) => state.datePickerReducer
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [guests, setGuests] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const chooseNumberOfGuestsRef = useRef();
  const handleOk = () => {
    setIsModalVisible(false);
    document.body.classList.remove("overflowAuto");
  };
  useClickOutside(chooseNumberOfGuestsRef, () => {
    isShow && setIsShow(false);
  });
  const handleCancel = () => {
    setIsModalVisible(false);
    document.body.classList.remove("overflowAuto");
  };

  const modalDatePicker = () => {
    setIsModalVisible(true);
    document.body.classList.add("overflowAuto");
  };

  useEffect(() => {
    return () => {
      dispatch(setStartDatePicker(moment(new Date()).format("LLLL")));
      dispatch(setEndDatePicker(moment(addDays(new Date(), 4)).format("LLLL")));
    };
  }, []);

  const handleBooking = () => {
    if (!user) {
      toast.info("Vui lòng đăng nhập !");
    } else {
      const data = {
        roomId: room._id,
        checkIn: startDatePick,
        checkOut: endDatePick,
      };
      httpServ
        .datPhongChoThue(data)
        .then((res) => {
          dispatch(setUserToStorage(res.data.userDetail));
          toast.success("Đặt phòng thành công !");
        })
        .catch((err) => toast.error("Đặt phòng thất bại !"));
    }
  };

  const dayCount = () => {
    let differenceTime =
      new Date(endDatePick).getTime() - new Date(startDatePick).getTime();
    return differenceTime / (1000 * 3600 * 24) + 1;
  };

  return (
    <div className="border rounded-xl shadow-xl p-6 sticky top-32 z-10 ">
      <div className="flex justify-between">
        <div className="flex font-normal justify-start items-baseline mb-6">
          <span className=" text-2xl font-semibold text-title">
            ${room?.price.toLocaleString()}
          </span>
          <span className="font-normal whitespace-nowrap text-lg">/ đêm</span>
        </div>
      </div>
      <div className="rounded-lg bg-white">
        <div className="flex">
          <button
            onClick={modalDatePicker}
            className={`flex-1 pl-6 py-3 pr-3 rounded-tl-lg border cursor-pointer text-left 
            ${isModalVisible && "border border-black"}
            `}
          >
            <div className="font-semibold">Check-In</div>
            <div className="text-sm text-gray-400">
              {moment(startDatePick).format("DD/MM/YYYY") || "Add date"}
            </div>
          </button>
          <button
            onClick={modalDatePicker}
            className={`flex-1 pl-6 py-3 pr-3 border rounded-tr-lg border-l-0 cursor-pointer text-left
            ${isModalVisible && "border border-black"}
            `}
          >
            <div className="font-semibold">Check-Out</div>
            <div className="text-sm text-gray-400">
              {moment(endDatePick).format("DD/MM/YYYY") || "Add date"}{" "}
            </div>
          </button>
          <Modal
            className="datVe"
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
          >
            <div className="pb-12">
              <h1 className="text-2xl font-semibold">Chọn ngày</h1>
              <p className="text-sm font-normal text-gray-500">
                Thêm ngày đi để biết giá chính xác
              </p>
            </div>
            <DatePicker />
          </Modal>
        </div>

        <div ref={chooseNumberOfGuestsRef} className="relative">
          <button
            onClick={() => setIsShow(!isShow)}
            className={`pl-6 py-3 pr-3 rounded-b-lg border border-t-0 cursor-pointer w-full text-left  
            ${isShow && "border border-black border-t"}
            `}
          >
            <div className="font-semibold">Khách</div>
            <div className="text-sm text-gray-400">{guests} Khách</div>
          </button>
          <div
            className={`absolute w-4/5 h-30 flex flex-col bg-white z-20 py-2 px-6 rounded-lg left-1/2 transform -translate-x-1/2 translate-y-2 shadow-lg top-full 
            ${isShow ? "block" : "hidden"}
            `}
          >
            <div className="flex justify-between items-center ">
              <p className="text-base font-semibold m-0">Khách</p>
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    guests > 1 && setGuests((prev) => prev - 1);
                  }}
                  className={` border  rounded-full w-8 h-8 flex items-center justify-center cursor-pointer outline-none
                  ${
                    guests === 1
                      ? "border-gray-300 bg-opacity-70 text-gray-300 cursor-not-allowed"
                      : "border-gray-700 text-gray-700 "
                  }
                  `}
                >
                  <MinusIcon className="w-6 h-6 text-base" />
                </button>
                <span className="p-3 font-semibold">{guests}</span>
                <button
                  onClick={() => {
                    guests < room?.guests && setGuests((prev) => prev + 1);
                  }}
                  className={` border  rounded-full w-8 h-8 flex items-center justify-center cursor-pointer outline-none
                  ${
                    guests === room?.guests
                      ? "border-gray-300 bg-opacity-70 text-gray-300 cursor-not-allowed"
                      : "border-gray-700 text-gray-700 "
                  }
                  `}
                >
                  <PlusIcon className="w-6 h-6 text-base" />
                </button>
              </div>
            </div>
            <div
              onClick={() => setIsShow(false)}
              className=" cursor-pointer p-2 self-end text-normal font-semibold rounded-lg hover:bg-gray-200"
            >
              <span className="underline text-base">Đóng</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleBooking}
        className="bg-primary w-full mt-4 text-white px-6 py-3 text-base font-semibold rounded-lg outline-none shadow-lg hover:opacity-90 transition "
      >
        Đặt phòng
      </button>
      <h5 className="text-center font-normal mt-3">Bạn vẫn chưa bị trừ tiền</h5>
      <div className="py-2 px-0">
        <div className="flex justify-between items-center pb-3">
          <span className="underline text-base">
            ${room?.price.toLocaleString()}x {dayCount()} đêm
          </span>
          <span className="text-base">
            ${(room?.price * dayCount()).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3">
          <span className="underline text-base">Phí dịch vụ</span>
          <span className="text-base">$100</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-6 pb-3">
        <span className="font-semibold text-base text-title">
          Tổng trước thuế
        </span>
        <span> ${(room?.price * dayCount() - 100).toLocaleString()}</span>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { UsersIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import moment from "moment";

import {
  setButton1Selected,
  setEndDateBooking,
  setStartDateBooking,
} from "../../redux/roomSlice";
export default function DatePicker() {
  let dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    dispatch(
      setStartDateBooking(moment(ranges.selection.startDate).format("LLLL"))
    );
    dispatch(
      setEndDateBooking(moment(ranges.selection.endDate).format("LLLL"))
    );
    dispatch(setButton1Selected(true));
  };

  return (
    <div className=" flex-col mx-auto w-full max-w-[600px] bg-white pb-4 !hidden phone:!flex z-50">
      <DateRangePicker
        className=""
        ranges={[selectionRange]}
        rangeColors={["#ff385c"]}
        onChange={handleSelect}
      />
      {/* <div className="flex ml-4 items-center border-b mb-4">
        <h2 className="text-2xl flex-grow font-semibold">Số lượng :</h2>
        <UsersIcon className="h-5" />
        <input
          type="number"
          value={noOfGuests}
          min={1}
          onChange={(e) => setNoOfGuests(e.target.value)}
          className="w-12 pl-2 text-lg outline-none text-red-400"
        />
      </div> */}
      {/* <div className="flex">
        <button className="flex-grow text-gray-500">Hủy</button>
        <button className="flex-grow text-red-400">Tìm kiếm</button>
      </div> */}
    </div>
  );
}

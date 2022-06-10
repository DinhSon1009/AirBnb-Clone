import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./DatePicker.css";
import {
  setEndDatePicker,
  setStartDatePicker,
} from "../../redux/datePickerSlice";
export default function DatePicker() {
  let dispatch = useDispatch();
  const { startDatePick, endDatePick } = useSelector(
    (state) => state.datePickerReducer
  );
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  useEffect(() => {
    setStartDate(new Date(startDatePick));
    setEndDate(new Date(endDatePick));
  }, [startDatePick, endDatePick]);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    dispatch(
      setStartDatePicker(moment(ranges.selection.startDate).format("LLLL"))
    );
    dispatch(setEndDatePicker(moment(ranges.selection.endDate).format("LLLL")));
  };
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const months = [
    "Tháng 1 năm",
    "Tháng 2 năm",
    "Tháng 3 năm",
    "Tháng 4 năm",
    "Tháng 5 năm",
    "Tháng 6 năm",
    "Tháng 7 năm",
    "Tháng 8 năm",
    "Tháng 9 năm",
    "Tháng 10 năm",
    "Tháng 11 năm",
    "Tháng 12 năm",
  ];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };

  return (
    <div className=" flex-col mx-auto w-full bg-white pb-4 flex z-50">
      <DateRange
        ranges={[selectionRange]}
        rangeColors={["rgb(247,247,247)"]}
        onChange={handleSelect}
        minDate={new Date()}
        months={2}
        direction="horizontal"
        locale={locale}
        weekStartsOn={1}
      />
    </div>
  );
}

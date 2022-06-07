import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { addDays } from "date-fns";

const datePickerSlice = createSlice({
  name: "roomDetail/datePicker",
  initialState: {
    startDatePick: moment(new Date()).format("LLLL"),
    endDatePick: moment(addDays(new Date(), 4)).format("LLLL"),
  },
  reducers: {
    setStartDatePicker: (state, action) => {
      state.startDatePick = action.payload;
    },
    setEndDatePicker: (state, action) => {
      state.endDatePick = action.payload;
    },
  },
});

const { reducer, actions } = datePickerSlice;

export const { setStartDatePicker, setEndDatePicker } = actions;

export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "dat phong",
  initialState: {
    startDate: null,
    endDate: null,
    button1Selected: false,
  },
  reducers: {
    setStartDateBooking: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDateBooking: (state, action) => {
      state.endDate = action.payload;
    },
    setButton1Selected: (state, action) => {
      state.button1Selected = action.payload;
    },
  },
});
const { reducer, actions } = roomSlice;

export const {
  setStartDateBooking,
  setEndDateBooking,
  setButton1Selected,
  setButton2,
} = actions;

export default reducer;

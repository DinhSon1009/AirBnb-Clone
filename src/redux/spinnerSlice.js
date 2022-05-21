import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    spinner: null,
    flag: true,
  },
  reducers: {
    setSpinnerStart: (state, action) => {
      state.spinner = true;
    },
    setSpinnerEnd: (state, action) => {
      state.spinner = false;
    },
    setFlag: (state, action) => {
      state.flag = action.payload;
    },
  },
});

const { reducer, actions } = spinnerSlice;

export const { setSpinnerStart, setSpinnerEnd, setFlag } = actions;

export default reducer;

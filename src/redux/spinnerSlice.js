import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    spinner: null,
  },
  reducers: {
    setSpinnerStart: (state, action) => {
      state.spinner = true;
    },
    setSpinnerEnd: (state, action) => {
      state.spinner = false;
    },
  },
});

const { reducer, actions } = spinnerSlice;

export const { setSpinnerStart, setSpinnerEnd } = actions;

export default reducer;

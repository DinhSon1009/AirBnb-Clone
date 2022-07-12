import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "/navbar",
  initialState: {
    offset: undefined,
    searchInfo: null,
  },
  reducers: {
    setSearchInfo: (state, action) => {
      state.searchInfo = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

const { reducer, actions } = navbarSlice;

export const { setSearchInfo, setOffset } = actions;

export default reducer;

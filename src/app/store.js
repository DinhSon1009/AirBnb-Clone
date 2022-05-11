import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/searchSlice";
import roomReducer from "../redux/roomSlice";
export const store = configureStore({
  reducer: {
    searchReducer: searchReducer,
    roomReducer: roomReducer,
  },
  devTools: true,
});

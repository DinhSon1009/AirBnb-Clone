import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "react-loading-skeleton/dist/skeleton.css";

// import { store } from "./app/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  roomReducer,
  searchReducer,
  spinnerReducer,
  userReducer,
  cartReducer,
  datePickerReducer,
} from "./redux";

export const store = configureStore({
  reducer: {
    searchReducer,
    spinnerReducer,
    userReducer,
    cartReducer,
    datePickerReducer,
  },
  devTools: true,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

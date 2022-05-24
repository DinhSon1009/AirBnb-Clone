import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "react-loading-skeleton/dist/skeleton.css";

// import { store } from "./app/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./redux/searchSlice";
import roomReducer from "./redux/roomSlice";
import spinnerReducer from "./redux/spinnerSlice";
import userReducer from "./redux/userSlice";
import cartReducer from "./redux/CartSlice";
export const store = configureStore({
  reducer: {
    searchReducer,
    roomReducer,
    spinnerReducer,
    userReducer,
    cartReducer,
  },
  devTools: true,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

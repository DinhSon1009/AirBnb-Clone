import React from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

export default function SpinnerLoading() {
  let { spinner } = useSelector((state) => state.spinnerReducer);
  return spinner ? (
    <div className=" fixed w-screen h-screen bg-black flex justify-center items-center bg-opacity-50 z-10">
      <ReactLoading
        type={"bubbles"}
        color={"#E8630A"}
        height={375}
        width={375}
      />
    </div>
  ) : (
    <></>
  );
}

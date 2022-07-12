import React from "react";
import Footer from "../../components/Footer/Footer";

export default function NotFound() {
  return (
    <>
      {/* <Header /> */}
      <div className="dsContainer flex items-center justify-center h-screen max-h-[400px]">
        <h4 className="text-xl">Kết quả tìm kiếm không tồn tại..</h4>
      </div>
      <Footer />
    </>
  );
}

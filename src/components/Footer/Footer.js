import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gray-100 flex justify-center flex-col items-center">
      <div className="grid grid-cols-1 lg:grid-cols-4 space-y-5  py-14 lg:space-y-0  text-gray-600  dscontainer  ">
        <div className=" space-y-4 text-sm text-gray-800 pb-5  border-b  border-gray-300 lg:border-none">
          <h5 className="font-bold">Hỗ trợ</h5>
          <div className="space-y-4 md:space-y-0 block md:grid grid-cols-3 md:gap-4 lg:space-y-4 lg:block  ">
            <Link className="block" to={"/"}>
              Trung tâm trợ giúp
            </Link>
            <Link className="block" to={"/"}>
              Thông tin an toàn
            </Link>
            <Link className="block" to={"/"}>
              Hỗ trợ người khuyết tật
            </Link>
            <Link className="block" to={"/"}>
              Các tùy chọn hủy
            </Link>
            <Link className="block" to={"/"}>
              Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
            </Link>
            <Link className="block" to={"/"}>
              Báo cáo lo ngại của hàng xóm
            </Link>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800 border-b  border-gray-300 lg:border-none pb-5 ">
          <h5 className="font-bold">Cộng đồng</h5>
          <div className="block space-y-4 md:space-y-0 md:grid grid-cols-3 md:gap-4 lg:space-y-4 lg:block">
            <Link className="block" to={"/"}>
              Airbnb.org: nhà ở cứu trợ
            </Link>
            <Link className="block" to={"/"}>
              Hỗ trợ dân tị nạn Afghanistan
            </Link>
            <Link className="block" to={"/"}>
              Chống phân biệt đối xử
            </Link>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800 border-b  border-gray-300 lg:border-none pb-5 ">
          <h5 className="font-bold">Đón tiếp khách</h5>
          <div className="block  md:grid grid-cols-3 space-y-4 md:space-y-0 md:gap-4 lg:space-y-4 lg:block">
            <Link className="block" to={"/"}>
              Thử đón tiếp khách
            </Link>
            <Link className="block" to={"/"}>
              AirCover cho Chủ nhà
            </Link>
            <Link className="block" to={"/"}>
              Xem tài nguyên đón tiếp khách
            </Link>
            <Link className="block" to={"/"}>
              Truy cập diễn đàn cộng đồng
            </Link>
            <Link className="block" to={"/"}>
              Đón tiếp khách có trách nhiệm
            </Link>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800 pb-5 ">
          <h5 className="font-bold">Giới thiệu</h5>
          <div className="block lg:block md:grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0 lg:space-y-4  ">
            <Link className="block" to={"/"}>
              Trang tin tức
            </Link>
            <Link className="block" to={"/"}>
              Tìm hiểu các tính năng mới
            </Link>
            <Link className="block" to={"/"}>
              Thư ngỏ từ các nhà sáng lập
            </Link>
            <Link className="block" to={"/"}>
              Cơ hội nghề nghiệp
            </Link>
            <Link className="block" to={"/"}>
              Nhà đầu tư
            </Link>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 text-sm border-t border-gray-300 w-full dscontainer p-5">
        <p>© 2022 Airbnb, Inc.</p>
        <Link to={"/"}>Quyền riêng tư</Link>
        <Link to={"/"}>Điều khoản</Link>
        <Link to={"/"}>Sơ đồ trang web</Link>
      </div>
    </div>
  );
}

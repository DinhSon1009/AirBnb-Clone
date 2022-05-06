import React from "react";
import { StyledLink } from "../../styles/customStyle";

export default function Footer() {
  return (
    <div className="bg-gray-100 flex justify-center flex-col items-center">
      <div className="grid grid-cols-1 lg:grid-cols-4 space-y-5  py-14 lg:space-y-0  text-gray-600  dscontainer  ">
        <div className=" space-y-4 text-sm text-gray-800 pb-5  border-b  border-gray-300 lg:border-none">
          <h5 className="font-bold">Hỗ trợ</h5>
          <div className="space-y-4 md:space-y-0 block md:grid grid-cols-3 md:gap-4 lg:space-y-4 lg:block  ">
            <StyledLink className="block" to={"/"}>
              Trung tâm trợ giúp
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Thông tin an toàn
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Hỗ trợ người khuyết tật
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Các tùy chọn hủy
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Báo cáo lo ngại của hàng xóm
            </StyledLink>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800 border-b  border-gray-300 lg:border-none pb-5 ">
          <h5 className="font-bold">Cộng đồng</h5>
          <div className="block space-y-4 md:space-y-0 md:grid grid-cols-3 md:gap-4 lg:space-y-4 lg:block">
            <StyledLink className="block" to={"/"}>
              Airbnb.org: nhà ở cứu trợ
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Hỗ trợ dân tị nạn Afghanistan
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Chống phân biệt đối xử
            </StyledLink>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800 border-b  border-gray-300 lg:border-none pb-5 ">
          <h5 className="font-bold">Đón tiếp khách</h5>
          <div className="block  md:grid grid-cols-3 space-y-4 md:space-y-0 md:gap-4 lg:space-y-4 lg:block">
            <StyledLink className="block" to={"/"}>
              Thử đón tiếp khách
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              AirCover cho Chủ nhà
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Xem tài nguyên đón tiếp khách
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Truy cập diễn đàn cộng đồng
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Đón tiếp khách có trách nhiệm
            </StyledLink>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800 pb-5 ">
          <h5 className="font-bold">Giới thiệu</h5>
          <div className="block lg:block md:grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0 lg:space-y-4  ">
            <StyledLink className="block" to={"/"}>
              Trang tin tức
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Tìm hiểu các tính năng mới
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Thư ngỏ từ các nhà sáng lập
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Cơ hội nghề nghiệp
            </StyledLink>
            <StyledLink className="block" to={"/"}>
              Nhà đầu tư
            </StyledLink>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 text-sm border-t border-gray-300 w-full dscontainer p-5">
        <p>© 2022 Airbnb, Inc.</p>
        <StyledLink to={"/"}>Quyền riêng tư</StyledLink>
        <StyledLink to={"/"}>Điều khoản</StyledLink>
        <StyledLink to={"/"}>Sơ đồ trang web</StyledLink>
      </div>
    </div>
  );
}

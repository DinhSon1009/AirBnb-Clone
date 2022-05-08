import AxiosServ from "./axios.service";

/* eslint-disable no-useless-constructor */
class HttpRequestService {
  constructor() {}

  // layDanhSachPhim = () => {
  //   const uri = "/api/QuanLyPhim/LayDanhSachPhim";
  //   return AxiosServ.getMethod(uri, false);
  // };
  layDiaDiem = (params) => {
    const uri = `/api/locations?limit=4&location=${params}`;
    return AxiosServ.getMethod(uri, false);
  };

  dangNhap = (data) => {
    const uri = "/api/auth/login";
    return AxiosServ.postMethod(uri, data);
  };

  dangKy = (data) => {
    const uri = "/api/auth/register";
    return AxiosServ.postMethod(uri, data);
  };

  layThongTinNguoiDung = (data) => {
    const uri = "/api/QuanLyNguoiDung/ThongTinTaiKhoan";

    return AxiosServ.postMethod(uri, data);
  };
  layDanhSachNguoiDung = () => {
    let uri = "/api/QuanLyNguoiDung/LayDanhSachNguoiDung";

    return AxiosServ.getMethod(uri);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;

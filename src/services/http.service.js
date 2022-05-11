import { MAP_API_TOKEN } from "../constants/constants";
import AxiosServ from "./axios.service";

/* eslint-disable no-useless-constructor */
class HttpRequestService {
  constructor() {}

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
  layDanhSachPhongChoThueTheoViTri = (id) => {
    let uri = `/api/rooms?locationId=${id}`;
    return AxiosServ.getMethod(uri);
  };
  layThongTinChiTietViTri = (id) => {
    let uri = `/api/locations/${id}`;
    return AxiosServ.getMethod(uri);
  };
  layThongTinChiTietPhong = (id) => {
    let uri = `/api/rooms/${id}`;
    return AxiosServ.getMethod(uri);
  };

  // map
  layViTriBanDo = (diachi) => {
    let uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${diachi}.json?access_token=${MAP_API_TOKEN}`;
    return AxiosServ.getMethod(uri);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;

import { MAP_API_TOKEN } from "../constants/constants";
import AxiosServ from "./axios.service";

/* eslint-disable no-useless-constructor */
class HttpRequestService {
  constructor() {}

  layDiaDiem = (params) => {
    const uri = `/api/locations?limit=4&location=${params}`;
    return AxiosServ.getMethod(uri, false);
  };

  layDanhSachDiaDiem = () => {
    const uri = `/api/locations`;
    return AxiosServ.getMethod(uri);
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
    const uri = "/api/QuanLyNguoiDung/LayDanhSachNguoiDung";

    return AxiosServ.getMethod(uri);
  };
  layDanhSachPhongChoThueTheoViTri = (id) => {
    const uri = `/api/rooms?locationId=${id}`;
    return AxiosServ.getMethod(uri);
  };
  layThongTinChiTietViTri = (id) => {
    const uri = `/api/locations/${id}`;
    return AxiosServ.getMethod(uri);
  };
  layThongTinChiTietPhong = (id) => {
    const uri = `/api/rooms/${id}`;
    return AxiosServ.getMethod(uri);
  };
  layDanhGia = (id) => {
    const uri = `/api/reviews/byRoom?roomId=${id}`;
    return AxiosServ.getMethod(uri);
  };
  // map
  layViTriBanDo = (diachi) => {
    const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${diachi}.json?access_token=${MAP_API_TOKEN}`;
    return AxiosServ.getMethod(uri);
  };

  capNhatAnhDaiDien = (data) => {
    const uri = "/api/users/upload-avatar";
    return AxiosServ.postMethod(uri, data);
  };
  datPhongChoThue = (data) => {
    const uri = "/api/rooms/booking";
    return AxiosServ.postMethod(uri, data);
  };
  layThongTinChiTietTicket = (id) => {
    const uri = `/api/tickets/${id}`;
    return AxiosServ.getMethod(uri);
  };
  taoDanhGia = (id, data) => {
    const uri = `/api/reviews?roomId=${id}`;
    return AxiosServ.postMethod(uri, data);
  };
  layDanhSachVeTheoNguoiDung = (id) => {
    const uri = `/api/tickets/by-user?userId=${id}`;
    return AxiosServ.getMethod(uri);
  };
  layDanhSachViTri = () => {
    const uri = `/api/locations`;
    return AxiosServ.getMethod(uri);
  };
  capNhatNguoiDung = (id, data) => {
    const uri = `/api/users/${id}`;
    return AxiosServ.putMethod(uri, data);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;

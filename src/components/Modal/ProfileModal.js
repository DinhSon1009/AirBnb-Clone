import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import httpServ from "../../services/http.service";
import { useDispatch, useSelector } from "react-redux";
import { setUserToStorage } from "../../redux/userSlice";
import { toast } from "react-toastify";
import moment from "moment";
import {
  CalendarTodayOutlined,
  LocationSearchingOutlined,
  MailOutlined,
  PhoneAndroidOutlined,
  PublishOutlined,
} from "@mui/icons-material";
import "./ProfileModal.css";

export default function ProfileModal({ isModalVisible, setIsModalVisible }) {
  const user = useSelector((state) => state.userReducer.user);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();

  const handleCancel = () => {
    document.body.classList.remove("overflowHidden");
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    const data = new FormData();
    data.append("avatar", file);
    setPreview(file);
    setFile(data);
  };
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview.preview);
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    document.body.classList.remove("overflowHidden");
    file &&
      httpServ
        .capNhatAnhDaiDien(file)
        .then((res) => {
          dispatch(setUserToStorage(res.data));
          setIsModalVisible(false);
          toast.success("Cập nhật thành công");
        })
        .catch((err) => toast.error("Cập nhật không thành công"));
    !file && setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Cập nhật ảnh đại diện"
        visible={isModalVisible}
        onCancel={handleCancel}
        className="profileModal"
        centered
      >
        <div className="p-8 pt-0">
          <h1 className="text-2xl font-semibold text-center mb-5">
            Update Profile
          </h1>
          <div className="flex flex-col md:flex-row ">
            <div className="flex-[4]">
              <div className="flex items-center">
                <img
                  src={user?.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col ml-5">
                  <span className="font-semibold">{user?.name}</span>
                  <span className="font-light">{user?.type}</span>
                </div>
              </div>
              <div className="mt-5">
                <span
                  style={{ color: "rgb(175, 170, 170)" }}
                  className="font-semibold text-sm"
                >
                  Account Details
                </span>

                <div className="flex items-center my-5 mx-0 text-[#444]">
                  <CalendarTodayOutlined className="text-base" />
                  <span className="ml-2">
                    {moment(user?.birthday).format("DD/MM/YYYY") || "Unknown"}
                  </span>
                </div>
                <span
                  style={{ color: "rgb(175, 170, 170)" }}
                  className="font-semibold text-sm"
                >
                  Contact Details
                </span>
                <div className="flex items-center my-5 mx-0 text-[#444]">
                  <PhoneAndroidOutlined className="showIcon" />
                  <span className="showInfoTitle">+84 {user?.phone}</span>
                </div>
                <div className="flex items-center my-5 mx-0 text-[#444]">
                  <MailOutlined className="showIcon" />
                  <span className="ml-2">{user?.email}</span>
                </div>
                <div className="flex items-center my-5 mx-0 text-[#444]">
                  <LocationSearchingOutlined className="userShowIcon" />
                  <span className="ml-2">{user?.address || "UnKnown"}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-center">
                <img
                  className="w-24 h-24 rounded-lg object-cover mt-5"
                  src={preview ? preview.preview : user?.avatar}
                  alt=""
                />
                <div>
                  <label className="text-base mb-[5px]" htmlFor="file">
                    <PublishOutlined style={{ cursor: "pointer" }} />
                  </label>
                  <input
                    onChange={handleChange}
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                value="Submit"
                style={{ backgroundColor: "darkblue" }}
                className="rounded-md border-none p-1 cursor-pointer text-white font-semibold max-w-[150px] mt-5"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import httpServ from "../../services/http.service";
import { useDispatch } from "react-redux";
import { setUserToStorage } from "../../redux/userSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

export default function ProfileModal({
  isModalVisible,
  setIsModalVisible,
  user,
}) {
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const handleOk = () => {
    file &&
      httpServ
        .capNhatAnhDaiDien(file)
        .then((res) => {
          toast.success("Cập nhật thành công !");
          dispatch(setUserToStorage(res.data));
          setIsModalVisible(false);
        })
        .catch((err) => {
          toast.error("Cập nhật không thành công !");
          setIsModalVisible(false);
        });
  };
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    const data = new FormData();
    data.append("avatar", file);
    setAvatar(file);
    setFile(data);
  };

  return (
    <>
      <Modal
        title="Cập nhật ảnh đại diện"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="relative flex items-center justify-start">
          <label
            htmlFor="input-file"
            className="cursor-pointer outline-none rounded-md border border-solid border-blue-500 p-4 flex items-center justify-center text-blue-500 active:bg-blue-100 hover:bg-blue-100 hover:shadow-md active:scale-95 transition transform duration-150 ease-out "
          >
            <CloudUploadIcon className="text-blue-500 pr-1 active:text-white" />
            Upload
          </label>
          <input
            className="hidden"
            type="file"
            id="input-file"
            name="file"
            onChange={handleChange}
          />
        </div>
        {avatar && <img src={avatar.preview} alt="avatar" />}
      </Modal>
    </>
  );
}

import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { StarIcon } from "../../assets/icons";
import httpServ from "../../services/http.service";
import { Button } from "../../styles/customStyle";
import CommentCard from "../Card/CommentCard";
import "./Rating.css";

export default function Rating({ roomID, danhGia }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const listTotalRating = [
    {
      content: "Mức độ sạch sẽ",
    },
    {
      content: "Liên lạc",
    },
    {
      content: "Nhận phòng",
    },
    {
      content: "Độ chính xác",
    },
    {
      content: "Vị trí",
    },
    {
      content: "Giá trị",
    },
  ];
  const [data, setData] = useState();
  useEffect(() => {
    roomID !== false &&
      httpServ
        .layDanhGia(roomID)
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
  }, [roomID, danhGia]);
  return (
    <div className="flex flex-wrap flex-col md:flex-row space-y-2">
      {data?.map(
        (item, index) =>
          index <= 7 && (
            <CommentCard
              key={index}
              img={item.userId?.avatar}
              content={item.content}
              time={item.updatedAt}
              name={item.userId?.name}
            />
          )
      )}
      {data?.length <= 7 ? (
        <></>
      ) : (
        <>
          <Button
            onClick={showModal}
            className="mt-10 rounded-md py-3 px-6 border border-black text-[#222] font-semibold transition text-base hover:underline bg-white w-fit"
          >
            Hiển thị tất cả {data?.length} đánh giá
          </Button>
          <Modal
            className="ratingStyle"
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="flex flex-col xl:flex-row">
              <div className="basis-1/3 ">
                <div className="flex items-center mb-8">
                  <StarIcon className="w-6 inline-flex text-primary mr-2  " />
                  <span className="font-semibold text-base ">4.97 </span>
                  <span className="m-2 text-base font-bold">·</span>
                  <span className="underline text-base font-medium cursor-pointer">
                    {data?.length} reviews
                  </span>
                </div>
                <ul>
                  {listTotalRating.map((item, index) => (
                    <li key={index} className="flex mb-4">
                      <h1 className="flex-1 text-base">{item.content}</h1>
                      <div className="flex flex-1 items-center">
                        <div className="relative w-32 h-1 bg-slate-400">
                          <div className="absolute h-full inset-0 w-[94%] bg-black"></div>
                        </div>
                        <span className="ml-3">4,7</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="basis-2/3 pl-0 xl:pl-[8%]">
                <div className="flex flex-wrap flex-col space-y-2">
                  {data?.map((item, index) => (
                    <CommentCard
                      key={index}
                      img={item.userId?.avatar}
                      content={item.content}
                      time={item.updatedAt}
                      name={item.userId?.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

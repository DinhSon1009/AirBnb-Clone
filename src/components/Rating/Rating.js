import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { StarIcon } from "../../assets/icons";
import httpServ from "../../services/http.service";
import { Button } from "../../styles/customStyle";
import CommentCard from "../Card/CommentCard";
import Review from "../Review/Review";
import "./Rating.css";

export default function Rating({ roomID, danhGia }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    roomID !== false &&
      httpServ
        .layDanhGia(roomID)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.error(err));
  }, [roomID, danhGia]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const listTotalRating = [
  //   {
  //     content: "Mức độ sạch sẽ",
  //   },
  //   {
  //     content: "Liên lạc",
  //   },
  //   {
  //     content: "Nhận phòng",
  //   },
  //   {
  //     content: "Độ chính xác",
  //   },
  //   {
  //     content: "Vị trí",
  //   },
  //   {
  //     content: "Giá trị",
  //   },
  // ];

  return (
    <div>
      <Review data={data} />

      <div className="flex flex-wrap flex-col md:flex-row space-y-2 pt-12">
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
        {data?.length <= 8 ? (
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
                <Review data={data} />
                <div className="basis-2/3 pl-0 xl:pl-[8%] pt-12">
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
    </div>
  );
}

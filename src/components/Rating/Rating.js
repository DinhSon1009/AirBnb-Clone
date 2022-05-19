import React, { useEffect, useState } from "react";
import httpServ from "../../services/http.service";
import CommentCard from "../Card/CommentCard";

export default function Rating({ roomID }) {
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
  }, [roomID]);
  return (
    <div className="flex flex-wrap flex-col md:flex-row space-y-2">
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
  );
}

import React from "react";
import moment from "moment";
import { UserCircleIcon } from "@heroicons/react/solid";
export default function CommentCard({ img, time, content, name }) {
  return (
    <div className="basis-1/2 pr-8">
      <div className="flex items-center">
        {img ? (
          <img
            className="w-14 h-14 rounded-full object-cover object-center"
            src={img}
            alt="avatar"
          />
        ) : (
          <UserCircleIcon className="w-20 h-20 rounded-full " />
        )}

        <div className="pl-3 md:pl-5">
          <h4>{name || "SomeBody"}</h4>
          <p>{moment(time).format("LLLL")}</p>
        </div>
      </div>
      <p className="mt-3">{content}</p>
    </div>
  );
}

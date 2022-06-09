import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchInfo } from "../../redux/searchSlice";

export default function SmallCard({ img, locationId, location, distance }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(setSearchInfo(location));
        navigate({
          pathname: "/search",
          search: `?id=${locationId}&&location=${location}`,
        });
      }}
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
    >
      {/* left */}
      <div className="relative h-16 w-16">
        <img src={img} className="rounded-lg" alt="location" />
      </div>
      {/* right  */}
      <div>
        <h2>{location}</h2>
        <h3>{distance}</h3>
      </div>
    </div>
  );
}

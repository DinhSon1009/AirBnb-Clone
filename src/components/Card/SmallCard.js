import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchInfo } from "../../redux/searchSlice";
import httpServ from "../../services/http.service";

export default function SmallCard({ locationId, distance }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  useEffect(() => {
    httpServ
      .layThongTinChiTietViTri(locationId)
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      onClick={() => {
        dispatch(setSearchInfo(`${location?.name}, ${location?.province}`));
        navigate({
          pathname: "/search",
          search: `?id=${locationId}`,
        });
      }}
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
    >
      {/* left */}
      <div className="relative h-16 w-16">
        <img
          src={location?.image}
          className="rounded-lg w-full h-full object-cover"
          alt="location"
        />
      </div>
      {/* right  */}
      <div>
        <h2>
          {location?.name}, {location?.province}
        </h2>
        <h3>{distance}</h3>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { MAP_API_TOKEN } from "../../constants/constants";
import httpServ from "../../services/http.service";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const addressdata = [
    {
      id: 1,
      address: "Quần đảo Nam Du, Kiên Giang",
    },
    {
      id: 2,
      address: "Nhà văn hóa quận thủ đức",
    },
  ];
  const [addressMarker, setAddressMarker] = useState([]);
  useEffect(() => {
    let newAddressData = [];
    addressdata.map((address) => {
      httpServ
        .layViTriBanDo(address.address)
        .then((res) => {
          newAddressData.push({
            ...address,
            latitude: res.data.features[1].center[1],
            longitude: res.data.features[0].center[0],
          });
        })
        .catch((err) => console.log(err));
    });
    setAddressMarker(newAddressData);
  }, []);

  const center = getCenter(addressMarker);

  console.log(addressMarker);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: -21.829213,
    latitude: 9.635801,
    zoom: 3,
  });
  console.log(center);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAP_API_TOKEN}
      onMove={(evt) => setViewport(evt.viewport)}
    >
      {addressMarker?.map((address, index) => (
        <Marker
          key={index}
          longitude={address.longitude}
          latitude={address.latitude}
          offsetLeft={-20}
          offsetTop={-10}
        />
      ))}
    </ReactMapGL>
  );
}

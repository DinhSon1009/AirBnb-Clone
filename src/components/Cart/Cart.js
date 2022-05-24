import { ShoppingCartIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCartAction } from "../../redux/CartSlice";
import httpServ from "../../services/http.service";

export default function Cart({ userId }) {
  const [cart, setCart] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    httpServ
      .layDanhSachVeTheoNguoiDung(userId)
      .then((res) => {
        setCart(res.data);
        dispatch(setCartAction(res.data));
      })
      .catch((err) => toast.error("Đã có lỗi xảy ra !"));
  }, [userId]);
  return (
    <div className="w-8 h-8 cursor-pointer relative">
      <ShoppingCartIcon />
      {cart?.length > 0 && (
        <div className="absolute -top-2 -right-1 font-semibold h-4 w-4 rounded-full border-red-500 bg-blue-400 text-center text-xs">
          {cart?.length}
        </div>
      )}
    </div>
  );
}

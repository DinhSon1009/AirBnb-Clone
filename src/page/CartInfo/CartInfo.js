import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Table } from "antd";
import httpServ from "../../services/http.service";
import { useSelector } from "react-redux";
import moment from "moment";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";
import { toast } from "react-toastify";
const { Column } = Table;

export default function CartInfo() {
  const [roomData, setRoomData] = useState(null);
  const cart = useSelector((state) => state.cartReducer.cart);
  useEffect(() => {
    let rooms = [];
    const getData = async () => {
      try {
        await Promise.all(
          cart.map(async (cart) => {
            let res = await httpServ.layThongTinChiTietTicket(cart._id);
            rooms.push({
              id: res.data._id,
              checkIn: moment(res.data.checkIn).format("DD/MM/YYYY"),
              checkOut: moment(res.data.checkOut).format("DD/MM/YYYY"),
              roomId: res.data.roomId || null,
            });
          })
        );

        setRoomData(rooms);
      } catch (err) {
        console.log(err);
        toast.error("Đã có lỗi xảy ra !");
      }
    };
    getData();
  }, [cart]);
  return (
    <>
      <main className="dscontainer pt-5">
        <h4 className="text-center text-xl p-2 text-primary font-bold">
          CART DETAIL
        </h4>
        <Table
          dataSource={roomData !== null && [...roomData]}
          rowKey="id"
          pagination={{ pageSize: 4 }}
        >
          <Column
            title="Địa điểm"
            dataIndex="roomId"
            key="roomId"
            render={(roomId) => <span>{roomId?.name}</span>}
            width="25%"
          />
          <Column
            title="Check In"
            dataIndex="checkIn"
            key="checkIn"
            width="25%"
          />
          <Column
            title="Check Out"
            dataIndex="checkOut"
            key="checkOut"
            width="25%"
          />
          <Column
            title="Hình ảnh"
            dataIndex="roomId"
            key="ảnh"
            width="25%"
            render={(roomId) => (
              <img
                src={roomId?.image || DEFAULT_IMAGE_PATH}
                alt="ảnh phòng trọ"
              />
            )}
          />
        </Table>
      </main>
      <Footer />
    </>
  );
}

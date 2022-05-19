import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import httpServ from "../../services/http.service";
import moment from "moment";
const { Column } = Table;

export default function CartModal({
  isCartModalVisible,
  setIsCartModalVisible,
  tickets,
}) {
  const [roomData, setRoomData] = useState(null);
  useEffect(() => {
    let rooms = [];
    const getData = async () => {
      try {
        await Promise.all(
          tickets.map(async (ticket) => {
            let res = await httpServ.layThongTinChiTietTicket(ticket);
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
      }
    };
    getData();
  }, [tickets]);

  console.log(roomData);
  return (
    <>
      <Modal
        title="Thông tin vé đã đặt"
        visible={isCartModalVisible}
        onOk={() => setIsCartModalVisible(false)}
        onCancel={() => setIsCartModalVisible(false)}
        centered
      >
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
          />
          <Column title="Check In" dataIndex="checkIn" key="checkIn" />
          <Column title="Check Out" dataIndex="checkOut" key="checkOut" />
          <Column
            title="Hình ảnh"
            dataIndex="roomId"
            key="ảnh"
            render={(roomId) =>
              roomId?.image ? (
                <img
                  src={roomId?.image}
                  alt="ảnh phòng trọ"
                  style={{ width: 200 }}
                />
              ) : (
                <span> Đang cập nhật ...</span>
              )
            }
          />
        </Table>
      </Modal>
    </>
  );
}

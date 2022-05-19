import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import httpServ from "../../services/http.service";
import Column from "antd/lib/table/Column";
import moment from "moment";

export default function CartModal({
  isCartModalVisible,
  setIsCartModalVisible,
  tickets,
}) {
  const [roomData, setRoomData] = useState([]);
  useEffect(() => {
    let rooms = [];
    tickets.map((ticket) => {
      httpServ
        .layThongTinChiTietTicket(ticket)
        .then((res) => {
          rooms.push({
            id: res.data._id,
            checkIn: moment(res.data.checkIn).format("DD/MM/YYYY"),
            checkOut: moment(res.data.checkOut).format("DD/MM/YYYY"),
            roomId: res.data.roomId || null,
          });
        })
        .catch((err) => console.log(err));
    });
    setRoomData(rooms);
  }, []);

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
          dataSource={[...roomData]}
          rowKey="id"
          pagination={{ pageSize: 4 }}
        >
          <Column title="Địa điểm" dataIndex="roomId" key="Địa điểm" />
          <Column title="Check In" dataIndex="checkIn" key="Check In" />
          <Column title="Check Out" dataIndex="checkOut" key="Check Out" />
        </Table>
      </Modal>
    </>
  );
}

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import httpServ from "../../services/http.service";
import { useNavigate } from "react-router";
import localStorageServ from "../../services/localStorage.service";
import { useDispatch } from "react-redux";
import { setUserToStorage } from "../../redux/userSlice";

export default function Login() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    httpServ
      .dangNhap(values)
      .then((res) => {
        message.success("Đăng nhập thành công !");
        localStorageServ.accessToken.set(res.data.token);
        dispatch(setUserToStorage(res.data.user));
        console.log(res.data);
        setTimeout(() => {
          navigation("/");
        }, 3000);
      })
      .catch((err) => message.error("Đăng nhập không thành công"));
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center h-screen  ">
      <div className="xl:basis-1/2 relative after:absolute after:inset-0 after:bg-gray-500 after:opacity-40 items-center justify-center flex-col hidden xl:flex  ">
        <img
          className="object-cover h-screen w-full "
          src="https://a0.muscache.com/im/pictures/miso/Hosting-48913506/original/222f3229-eb09-4331-9b88-74a94d7f4041.jpeg?im_w=1200"
          alt=""
        />
        <div className="!absolute z-40 text-center text-white">
          <h1 className="text-4xl text-white fontbase  ">Sign In</h1>
          <p className="text-xl">Welcome to our greate community</p>
          <div className="flex items-center mt-8 space-x-4">
            <p className="text-xl p-0 m-0">Need an account?</p>
            <button className="!text-xl !py-3 !px-6 bg-transparent border hover:border-purple-400 transition duration-150 border-white rounded-xl ">
              <Link className="text-white hover:text-white" to={"/register"}>
                Sign up
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="min-w-[300px] w-full xl:basis-1/2  text-center flex items-center flex-col  justify-center  h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300  ">
        <div className=" border border-purple-400  !p-10 w-5/6  md:w-2/3 h-2/3 min-h-[600px] rounded-xl glass  z-50">
          <h2 className="text-4xl fontbase">Đăng nhập</h2>
          <Form
            name="basic"
            layout="vertical"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className="flex items-center justify-center"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Button
                type="ghost"
                htmlType="submit"
                className="absolute 2xl:mt-5 "
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

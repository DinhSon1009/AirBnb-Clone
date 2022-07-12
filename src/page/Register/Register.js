import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { Link } from "react-router-dom";
import httpServ from "../../services/http.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import {
  CheckOutlined,
  LockOutlined,
  MailOutlined,
  PersonOutlined,
  PhoneOutlined,
} from "@mui/icons-material";

export default function Register() {
  const navigation = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    httpServ
      .dangKy(values)
      .then((res) => {
        toast.success("Đăng ký thành công");
        console.log(res.data);
        setTimeout(() => {
          navigation("/login");
        }, 3000);
      })
      .catch((err) => toast.error("Đăng ký không thành công"));
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {/* <Header /> */}
      <div className="flex items-center justify-center xl:h-screen  max-h-[800px]  ">
        <div className="xl:basis-1/2 relative h-full after:absolute after:inset-0 after:bg-gray-500 after:opacity-40 items-center justify-center flex-col hidden xl:flex  ">
          <img
            className="object-cover h-full w-full "
            src="https://a0.muscache.com/im/pictures/miso/Hosting-48913506/original/222f3229-eb09-4331-9b88-74a94d7f4041.jpeg?im_w=1200"
            alt=""
          />
          <div className="!absolute z-10 text-center text-white">
            <h1 className="text-4xl text-white ">Sign Up</h1>
            <p className="text-xl">
              Please enter your details to sign up and be part of our greate
              community
            </p>
            <p className="text-xl">Already have an account?</p>
            <button className="!text-xl !py-3 !px-6 bg-transparent border hover:border-purple-400 transition duration-150 border-white rounded-xl mt-8">
              <Link className="text-white hover:text-white" to={"/login"}>
                Sign in
              </Link>
            </button>
          </div>
        </div>
        <div className="min-w-[300px] w-full h-full xl:basis-1/2  text-center flex items-center flex-col  justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 px-3 py-10">
          <div className=" border border-purple-400 p-5 pb-0 md:p-10 w-full md:w-2/3 min-h-[400px] rounded-xl glass  z-10">
            <h4 className="text-2xl text-primary">REGISTER</h4>

            <Form
              name="basic"
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
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Your Email"
                  prefix={<MailOutlined className="text-gray-500 pr-2" />}
                />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value?.trim().length <= 7) {
                        return Promise.reject(
                          new Error("Name must be at least 8 characters")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  placeholder="Your Name"
                  prefix={<PersonOutlined className="text-gray-500 pr-2" />}
                />
              </Form.Item>
              <Form.Item
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please choose your birthday!",
                  },
                ]}
                wrapperCol={{ span: 8 }}
              >
                <DatePicker placeholder="Your Birthday" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 9,
                    whitespace: false,
                    message: "Phone must be at least 9 characters",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Your Password"
                  prefix={<LockOutlined className="text-gray-500 pr-2" />}
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Your Password"
                  prefix={<CheckOutlined className="text-gray-500 pr-2" />}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Please enter only numbers",
                  },
                  {
                    min: 9,
                    whitespace: false,
                    message: "Phone must be at least 9 characters",
                  },
                ]}
              >
                <Input
                  placeholder="Your Phone"
                  prefix={<PhoneOutlined className="text-gray-500 pr-2" />}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                className="flex items-center justify-center"
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Button type="ghost" htmlType="submit" className="2xl mt-5">
                  SIGN UP NOW
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

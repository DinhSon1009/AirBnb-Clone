import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import httpServ from "../../services/http.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
export default function Register() {
  const navigation = useNavigate();
  const onFinish = (values) => {
    httpServ
      .dangKy(values)
      .then((res) => {
        toast.success("Đăng ký thành công");
        // console.log(res.data);
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
    <div className="flex items-center justify-center h-screen  ">
      <div className="xl:basis-1/2 relative after:absolute after:inset-0 after:bg-gray-500 after:opacity-40 items-center justify-center flex-col hidden xl:flex  ">
        <img
          className="object-cover h-screen w-full "
          src="https://a0.muscache.com/im/pictures/miso/Hosting-48913506/original/222f3229-eb09-4331-9b88-74a94d7f4041.jpeg?im_w=1200"
          alt=""
        />
        <div className="!absolute z-40 text-center text-white">
          <h1 className="text-4xl text-white fontbase  ">Sign Up</h1>
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
      <div className="min-w-[300px] w-full xl:basis-1/2  text-center flex items-center flex-col  justify-center  h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300  ">
        <div className=" border border-purple-400  !p-10 w-5/6  md:w-2/3 h-2/3 min-h-[600px] rounded-xl glass  z-50">
          <h2 className="text-4xl fontbase">Đăng ký</h2>
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
              name="email"
              label="E-mail"
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
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
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
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
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
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input style={{ width: "100%" }} />
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

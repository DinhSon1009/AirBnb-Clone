import { Form, Input, Button } from "antd";
import httpServ from "../../services/http.service";
import { useNavigate } from "react-router";
import localStorageServ from "../../services/localStorage.service";
import { useDispatch } from "react-redux";
import { setUserToStorage } from "../../redux/userSlice";
import { useTitle } from "../../Hooks/useTitle/useTitle";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    httpServ
      .dangNhap(values)
      .then((res) => {
        toast.success("Đăng nhập thành công !");
        localStorageServ.accessToken.set(res.data.token);
        dispatch(setUserToStorage(res.data.user));
        setTimeout(() => {
          navigation("/");
          window.location.reload();
        }, 2000);
      })
      .catch((err) => toast.error("Tài khoản hoặc mật khẩu không đúng !"));
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  useTitle("Đăng nhập");

  return (
    <div>
      {/* <Header /> */}
      <div className="flex items-center justify-center h-[500px] xl:h-screen  max-h-[800px]   ">
        <div className="xl:basis-1/2 relative h-full  after:absolute after:inset-0 after:bg-gray-500 after:opacity-40 items-center justify-center flex-col hidden xl:flex  ">
          <img
            className="object-cover h-full w-full "
            src="https://a0.muscache.com/im/pictures/miso/Hosting-48913506/original/222f3229-eb09-4331-9b88-74a94d7f4041.jpeg?im_w=1200"
            alt=""
          />
          <div className="!absolute z-40 text-center text-white">
            <h1 className="text-4xl text-white fontbase  ">Sign In</h1>
            <p className="text-xl">Welcome to our greate community</p>
            <div className="flex items-center mt-8 space-x-4">
              <p className="text-xl p-0 m-0">Need an account?</p>
              <button
                onClick={() => navigation("/register")}
                className="!text-xl !py-3 !px-6 bg-transparent border hover:border-purple-400 transition duration-150 border-white rounded-xl"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-[300px] w-full h-full xl:basis-1/2  text-center flex items-center flex-col  justify-center  bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 px-3">
          <div className=" border border-purple-400 p-10  w-full  md:w-2/3  rounded-xl glass z-10">
            <h4 className="text-2xl text-primary">LOGIN</h4>
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
                  className="absolute 2xl:mt-5"
                  size="large"
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
            <div className="flex xl:hidden justify-end items-center">
              <h4
                onClick={() => navigation("/register")}
                className="text-base p-0 m-0 hover:text-primary transition cursor-pointer font-semibold"
              >
                Bạn chưa có tài khoản?
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

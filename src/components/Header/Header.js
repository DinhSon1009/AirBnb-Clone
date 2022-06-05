import { useRef, useState } from "react";
import { ReactComponent as SmallLogo } from "../../assets/images/airbnb_small.svg";
import { ReactComponent as LargeLogo } from "../../assets/images/air_bnb_large.svg";
import Search from "../Search/Search";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromStorage } from "../../redux/userSlice";
import useClickOutside from "../../Hooks/useClickOutside/useCLickOutside";
import useEventListener from "../../Hooks/useEventListener/useEventListener";
import ProfileModal from "../Modal/ProfileModal";
import Cart from "../Cart/Cart";
import { LoginIcon, LogoutIcon, UploadIcon } from "@heroicons/react/outline";
import { AlignIcon, UserIcon } from "../../assets/icons";
// import CartModal from "../Modal/CartModal";

export default function Header({ offset, searchInfo }) {
  const [searchClick, setSearchClick] = useState(false);
  const searchRef = useRef();
  const toggleRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const [toggle, setToggle] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const [isCartModalVisible, setIsCartModalVisible] = useState(false);

  useClickOutside(searchRef, () => {
    setSearchClick(false);
  });
  useClickOutside(toggleRef, () => {
    toggle && setToggle(false);
  });
  useClickOutside();

  useEventListener("scroll", (e) => {
    setSearchClick(false);
  });
  const themes = () => {
    if (offset === undefined) {
      return {
        header: "sticky bg-white shadow-md md:after:ds_scrollTransition ",
        text: "text-black",
        color: "#ff385c",
      };
    } else if (offset)
      return {
        header: "bg-white shadow-md after:ds_scrollTransition ",
        text: "text-black ",
        color: "#ff385c",
      };
    else
      return {
        header: `after:ds_transition  ${
          searchClick
            ? "bg-white after:!opacity-100"
            : "after:!scale-y-1 md:after:!scale-y-[1.5]"
        }`,
        text: `${searchClick ? "text-black" : "text-white"}`,
        color: `${searchClick ? "#ff385c" : "white"}`,
      };
  };

  const userHandler = () => {
    setToggle((toggle) => !toggle);
  };
  const handleLogout = () => {
    dispatch(removeUserFromStorage());
    window.location.reload();
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <header
      ref={searchRef}
      className={`fixed top-0 z-50 h-20 w-full left-0 mx-auto md:before:ds_header_before ${
        themes().header
      }  ${searchClick && "after:!scale-y-[1] md:after:!scale-y-[2.25]"}`}
    >
      <div
        className={` flex h-full relative p-3 items-center dscontainer font-semibold z-10
         ${themes().text} `}
      >
        {/* left  */}
        <div className=" relative flex items-center h-10 my-auto lg:basis-1/3">
          <LargeLogo
            className="hidden lg:block h-full object-contain object-left cursor-pointer z-50"
            fill={`${themes().color}`}
            onClick={(e) => navigation("/")}
          />
          <SmallLogo
            className="block lg:hidden object-contain object-left h-full cursor-pointer z-50 "
            fill={`${themes().color}`}
            onClick={(e) => navigation("/")}
          />
        </div>
        {/* middle */}
        <div
          className={` relative transition-transform transform duration-300 h-full w-full  md:absolute left-0 basis-0 ${
            searchClick
              ? "visible py-0 !scale-100 opacity-100 px-6"
              : "invisible !scale-0 opacity-0"
          } `}
        >
          <div className="absolute inset-0  w-full h-full m-auto  flex items-center ">
            <div className="w-full invisible md:visible max-w-[850px] absolute inset-0 m-auto ">
              <Search searchInfo={searchInfo} LargeScreen />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div
            className={`hidden md:block relative w-full max-w-[300px] mx-3 ${
              searchClick && "md:hidden"
            }`}
            onClick={() => {
              setSearchClick(!searchClick);
            }}
          >
            <Search searchInfo={searchInfo} />
          </div>

          <div className="block md:hidden relative w-full max-w-[300px] mx-3 ">
            <Search searchInfo={searchInfo} />
          </div>
        </div>

        {/* right  */}

        <div className="flex flex-grow items-center space-x-4 justify-end basis-1/3 z-50 ">
          <p className="hidden md:inline cursor-pointer m-0 whitespace-nowrap">
            Trở thành chủ nhà
          </p>
          {user ? (
            <button onClick={() => navigation("/CartDetail")}>
              <Cart userId={user._id} />
            </button>
          ) : (
            <></>
          )}
          <div
            onClick={userHandler}
            className={`flex items-center border rounded-full bg-white cursor-pointer outline-none ${
              user ? "p-0" : "p-[5px] pl-3"
            }`}
          >
            {user ? (
              <div className="w-10 h-10">
                {user.avatar ? (
                  <img
                    className=" rounded-full w-full h-full object-cover object-center"
                    src={user.avatar}
                    alt="avatar"
                  />
                ) : (
                  <div className="ml-3 text-[#717171]">
                    <UserIcon />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="text-[#222222]">
                  <AlignIcon className="h-6" />
                </div>
                <div className="ml-3 w-[30px] h-[30px] text-[#717171]">
                  <UserIcon />
                </div>
              </>
            )}
          </div>
          {toggle && (
            <div
              ref={toggleRef}
              className="absolute top-full p-3 rounded-xl bg-white text-gray-900 right-0 cursor-pointer shadow-md "
            >
              {user ? (
                <>
                  <button
                    onClick={showModal}
                    to={"/"}
                    className="flex items-center hover:bg-gray-100 p-2 text-inherit hover:text-inherit whitespace-nowrap"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 p-1">
                      <UploadIcon />
                    </div>
                    <span className="ml-2"> Cập nhật ảnh đại diện</span>
                  </button>
                  <div
                    onClick={handleLogout}
                    className="flex hover:bg-gray-100 p-2 text-inherit hover:text-inherit items-center"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 p-1 ">
                      <LogoutIcon />
                    </div>
                    <span className="ml-2">Đăng xuất</span>
                  </div>
                </>
              ) : (
                <Link
                  to={"/login"}
                  className="flex items-center hover:bg-gray-100 p-2 text-inherit hover:text-inherit"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 p-1">
                    <LoginIcon />
                  </div>
                  <span className="ml-2">Đăng nhập</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <div className="w-full absolute  mt-[150px] inset-0">
        <DatePicker />
      </div> */}
      {isModalVisible && (
        <ProfileModal
          user={user}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      {/* {isCartModalVisible && (
        <CartModal
          tickets={user.tickets}
          isCartModalVisible={isCartModalVisible}
          setIsCartModalVisible={setIsCartModalVisible}
        />
      )} */}
    </header>
  );
}

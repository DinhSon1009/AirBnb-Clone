// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
// import SpinnerLoading from "./components/SpinnerLoading/SpinnerLoading";
import Home from "./page/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Login from "./page/Login/Login";
import NotFound from "./page/NotFound/NotFound";
import Register from "./page/Register/Register";
import RoomDetail from "./page/RoomDetail/RoomDetail";
import SearchPage from "./page/SearchPage/SearchPage";
import CartInfo from "./page/CartInfo/CartInfo";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ScrollToTop from "./components/ScrollTopTop/ScrollToTop";
import Header from "./components/Header/Header";
import AppLayout from "./page/AppLayout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      {/* {isLoading && flag && <SpinnerLoading />} */}
      <ScrollToTop />
      {/* <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="RoomDetail/:id" element={<RoomDetail />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/CartDetail" element={<CartInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes> */}
      <AppLayout />
      <ToastContainer autoClose={2000} pauseOnHover={false} draggable />
    </BrowserRouter>
  );
}

export default App;

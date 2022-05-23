import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SpinnerLoading from "./components/SpinnerLoading/SpinnerLoading";
import Home from "./page/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Login from "./page/Login/Login";
import NotFound from "./page/NotFound/NotFound";
import Register from "./page/Register/Register";
import RoomDetail from "./page/RoomDetail/RoomDetail";
import SearchPage from "./page/SearchPage/SearchPage";
function App() {
  const isLoading = useSelector((state) => state.spinnerReducer.spinner);
  const flag = useSelector((state) => state.spinnerReducer.flag);

  return (
    <BrowserRouter>
      {/* {isLoading && flag && <SpinnerLoading />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="RoomDetail/:id" element={<RoomDetail />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </BrowserRouter>
  );
}

export default App;

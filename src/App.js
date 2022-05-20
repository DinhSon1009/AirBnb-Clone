import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SpinnerLoading from "./components/SpinnerLoading/SpinnerLoading";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import RoomDetail from "./page/RoomDetail/RoomDetail";
import SearchPage from "./page/SearchPage/SearchPage";
function App() {
  const isLoading = useSelector((state) => state.spinnerReducer.spinner);
  return (
    <BrowserRouter>
      {isLoading && <SpinnerLoading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="RoomDetail/:id" element={<RoomDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

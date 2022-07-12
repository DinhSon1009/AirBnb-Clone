import { Route, Routes } from "react-router";
import Header from "../../components/Header/Header";
import useLocations from "../../Hooks/useLocations/useLocations";
import CartInfo from "../CartInfo/CartInfo";
import Home from "../Home/Home";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import RoomDetail from "../RoomDetail/RoomDetail";
import SearchPage from "../SearchPage/SearchPage";

export default function AppLayout() {
  const { locations } = useLocations();
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home locations={locations} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="RoomDetail/:id" element={<RoomDetail />} />
        <Route path="/CartDetail" element={<CartInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

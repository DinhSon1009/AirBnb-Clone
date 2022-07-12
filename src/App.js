import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ScrollToTop from "./components/ScrollTopTop/ScrollToTop";
import AppLayout from "./page/AppLayout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
      <ToastContainer autoClose={2000} pauseOnHover={false} draggable />
    </BrowserRouter>
  );
}

export default App;

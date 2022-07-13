import Footer from "../../components/Footer/Footer";
import LookUpIcon from "../../assets/images/fakeDataImage";
export default function NotFound() {
  return (
    <>
      <div className="dsContainer flex-col flex items-center justify-center h-screen max-h-[400px]">
        <img className="w-32 h-32" src={LookUpIcon} alt="loadIcon" />
        <h4 className="text-xl">Kết quả tìm kiếm không tồn tại...</h4>
      </div>
      <Footer />
    </>
  );
}

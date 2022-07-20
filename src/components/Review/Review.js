import { StarIcon } from "../../assets/icons";

function Review({ data }) {
  const listTotalRating = [
    {
      content: "Mức độ sạch sẽ",
    },
    {
      content: "Liên lạc",
    },
    {
      content: "Nhận phòng",
    },
    {
      content: "Độ chính xác",
    },
    {
      content: "Vị trí",
    },
    {
      content: "Giá trị",
    },
  ];
  return (
    <div className="basis-1/3 pb-12 border-b">
      <div className="sm:sticky top-0 left-0">
        <div className="flex items-center mb-8">
          <StarIcon className="w-6 inline-flex text-primary mr-2  " />
          <span className="font-semibold text-base ">4.97 </span>
          <span className="m-2 text-base font-bold">·</span>
          <span className="underline text-base font-medium cursor-pointer">
            {data?.length} reviews
          </span>
        </div>
        <ul className="flex flex-wrap gap-3">
          {listTotalRating.map((item, index) => (
            <li
              style={{ width: "calc(50% - 12px)" }}
              key={index}
              className="flex min-w-[300px] mb-4"
            >
              <h1 className="flex-1 text-base">{item.content}</h1>
              <div className="flex flex-1 items-center">
                <div className="relative w-32 h-1 bg-slate-400">
                  <div className="absolute h-full inset-0 w-[94%] bg-black"></div>
                </div>
                <span className="ml-3">4,7</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Review;

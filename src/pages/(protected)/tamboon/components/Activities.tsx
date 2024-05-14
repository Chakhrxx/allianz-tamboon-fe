// import { useState } from "react";
// import ActivesModal from "./DetailModal";
// import JoinModal from "./JoinModal";
import EagleCoins from "@/assets/svgs/eagle-coin.svg";
import { useNavigate } from "react-router-dom";

function Actives() {
  const navigate = useNavigate();
  const data = [
    {
      id: "1A2A3A",
      title: "กิจกรรมคัดแยกขยะ",
      point: 10,
      date: 1714549082000,
      descriptions: `กิจกรรมคัดแยกขยะ กิจกรรมคัดแยกขยะ`,
      imageurl:
        "https://www.klongyanglocal.go.th/images/abt/content/20200219095447_57993.jpg",
      url: "https://www.youtube.com/embed/qxUWkr1_JQw",
      video: "https://www.youtube.com/embed/qxUWkr1_JQw",
    },
    {
      id: "1B2B3B",
      title: "กิจกกรรมล้างจาน",
      point: 5,
      date: 1717573082000,
      descriptions: `กิจกกรรมล้างจาน กิจกกรรมล้างจาน`,
      imageurl:
        "https://www.klongyanglocal.go.th/images/abt/content/20200219095447_57993.jpg",
      url: "https://www.youtube.com/embed/ERRQLU9g43o",
      video: "https://www.youtube.com/embed/ERRQLU9g43o",
    },
    {
      id: "1C2C3C",
      title: "กิจกกรรมเพิ่มเติม",
      point: 3,
      date: 1718869082000,
      descriptions: `กิจกรรมอาสาออนไลน์ "ลองดี" ช่วยผู้ประสบภัยน้ำท่วม`,
      imageurl:
        "https://www.klongyanglocal.go.th/images/abt/content/20200219095447_57993.jpg",
      url: "https://www.youtube.com/embed/ACU5beeoBA8",
      video: "https://www.youtube.com/embed/ACU5beeoBA8",
    },
  ];
  const truncatedData = data.map((item) => {
    const [first, second] = item.descriptions.split(" ");
    const descriptions = `${first} ${second}`;
    return {
      ...item,
      descriptions:
        descriptions.length > 25
          ? `${descriptions.substring(0, 20)} ...`
          : `${descriptions} ...`,
    };
  });
  return (
    <>
      <div className="font-bold text-left text-base pb-2">Activity</div>
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex flex-wrap gap-4">
          {truncatedData.map((item) => (
            <div
              className="bg-[#ECF4F6] shadow-md px-4 py-2 rounded-2xl w-full text-left"
              key={item.id}
            >
              <div className="flex justify-between items-center">
                <div className=" text-base font-bold font-inter">
                  {item.title}
                </div>
                <div className="relative z-10 flex items-center justify-center gap-2  ">
                  <img className=" h-9" src={EagleCoins} alt="Eagle Coin" />
                  <div>
                    <div className="text-left font-semibold text-xl text-[#EDA740] drop-shadow">
                      {item?.point}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2 text-sm font-inter">
                {item?.descriptions}
              </div>
              <div className="flex justify-between items-center my-2">
                <div className="text-red-400  text-sm">
                  Expired :{" "}
                  {new Date(item.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-white py-1 px-6 rounded-full border-2 border-primary text-sm"
                    onClick={() => navigate(`/csr/${item?.id}`)}
                  >
                    Detail
                  </button>
                  <button
                    className="bg-primary text-white py-1 px-8 rounded-full text-sm"
                    onClick={() => navigate(`/csr/join/${item?.id}`)}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Actives;

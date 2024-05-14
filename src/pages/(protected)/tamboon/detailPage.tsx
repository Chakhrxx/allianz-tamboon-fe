import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = [
    {
      id: "1A2A3A",
      title: "กิจกรรมคัดแยกขยะ",
      point: 10,
      date: 1714549082000,
      descriptions: `กิจกรรมคัดแยกขยะ กิจกรรมคัดแยกขยะ`,
      imageUrl:
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
      imageUrl:
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
      imageUrl:
        "https://www.klongyanglocal.go.th/images/abt/content/20200219095447_57993.jpg",
      url: "https://www.klongyanglocal.go.th/images/abt/content/20200219095447_57993.jpg",
      video: "https://www.youtube.com/embed/ACU5beeoBA8",
    },
  ];
  const filteredData = data.filter((item) => item?.id === id);
  useEffect(() => {
    if (filteredData.length === 0) {
      navigate(`/csr/id/${id}`);
    }
  });

  return (
    <>
      <div className="relative  text-center p-6 bg-white rounded-t-[38px]">
        <div className="relative  bg-[#ECF4F6] rounded-3xl drop-shadow-sm h-full">
          {filteredData.map((item) => (
            <div
              className=" shadow-md  rounded-2xl w-full text-left px-10 py-4"
              key={item?.id}
            >
              <div className="relative z-10 text-center">
                <p className="text-2xl font-bold mb-2 drop-shadow-sm">
                  {item?.title}
                </p>
                <img
                  className="w-full border border-collapse mb-2"
                  src={item?.imageUrl}
                  alt=""
                  style={{ height: "150px" }}
                />
                <div className="text-left text-md font-bold mb-2 drop-shadow-sm">
                  {item?.title}
                  <p className="text-left pl-4 text-sm font-normal mt-2 drop-shadow-sm">
                    {item?.descriptions}
                  </p>
                </div>

                <p className="text-left  text-sm font-normal">
                  รายละเอียดกิจกรรม :{" "}
                </p>
                <Link className="text-left  text-sm underline" to={item?.url}>
                  <div className="text-left  text-sm text-[#0066DE] indent-4 break-words overflow-hidden prose">
                    {item?.url}
                  </div>
                </Link>

                <iframe
                  className="my-2 w-full"
                  height="210"
                  src={item?.video}
                  title={item?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>

                <div className="relative space-x-4 items-center my-4">
                  <button
                    className="bg-white py-2 px-8 rounded-full border border-1 border-primary text-sm"
                    onClick={() => navigate("/csr")}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary text-white py-2 px-8 rounded-full text-sm border border-1 border-primary "
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

export default DetailsPage;

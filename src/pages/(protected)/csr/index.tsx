import CSR from "@/components/CSR";
import { useProfile } from "@/hooks/useProfile";
import Actives from "./components/Activities";
import Histories from "./components/Histories";
function CSRPage() {
  const { data: profile } = useProfile();
  const actives_Arr = [
    {
      id: "1A2A3A",
      title: "กิจกรรมคัดแยกขยะ",
      point: 10,
      date: 1714549082000,
      descriptions: ` กิจกรรมอาสาออนไลน์ "ลองดี" ช่วยผู้ประสบภัยน้ำท่วม`,
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
      descriptions: ` กิจกรรมอาสาออนไลน์ "ลองดี" ช่วยผู้ประสบภัยน้ำท่วม`,
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
      descriptions: ` กิจกรรมอาสาออนไลน์ "ลองดี" ช่วยผู้ประสบภัยน้ำท่วม`,
      imageurl:
        "https://www.klongyanglocal.go.th/images/abt/content/20200219095447_57993.jpg",
      url: "https://www.youtube.com/embed/ACU5beeoBA8",
      video: "https://www.youtube.com/embed/ACU5beeoBA8",
    },
  ];
  const history_Arr = [
    { title: "กิจกรรมคัดแยกขยะ", status: "Waiting", date: 1709624582000 },
    { title: "กิจกกรรมล้างจาน", status: "Approve", date: 1709249522000 },
    { title: "กิจกกรรมเพิ่มเติม", status: "Reject", date: 1709105882000 },
  ];

  return (
    <div className="relative z-10 text-center space-y-5 pb-10 mt-5">
      <CSR className="mx-auto w-28 h-28" points={profile?.coins} />
      <div className="mx-auto  space-y-2">
        <Actives data={actives_Arr} />
        <Histories data={history_Arr} />
      </div>
    </div>
  );
}

export default CSRPage;

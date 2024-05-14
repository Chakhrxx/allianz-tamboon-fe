import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "./components/Avatar";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import UploadIcon from "@/assets/svgs/Upload.svg";
import { useProfile } from "@/hooks/useProfile";
import { queryClient } from "@/libs/query-client";
import { profileService } from "@/services/profile";
import ProfileSettingsModal from "../profile/components/ProfileSettingModal";
import SuccessModal from "./components/SuccessModal";

function JoinActivityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (filteredData.length === 0) {
      navigate(`/csr/join/id/${id}`);
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { data: profile, refetch: refreshProfile } = useProfile({
    enabled: false,
  });

  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const file = target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  if (!profile) return null;

  const data = [
    {
      id: "1A2A3A",
      title: "กิจกรรมคัดแยกขยะ",
      point: 10,
      date: 1714549082000,
      descriptions: `กิจกรรมคัดแยกขยะ กิจกรรมคัดแยกขยะ`,
      detatails: `กิจกรรมที่ 1 : กิจกรรมคัดเเยกขยะ ผู้เข้าร่วมต้องทำการคัด
      จากนั้นทำการถ่ายภาพการคัดแยกขยะของคุณเพื่อเป็นหลักฐานการเข้าร่วมกิจกรรมเพื่อรับ 10 คะแนน`,
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
      url: "https://www.youtube.com/embed/ACU5beeoBA8",
      video: "https://www.youtube.com/embed/ACU5beeoBA8",
    },
  ];
  const filteredData = data.filter((item) => item?.id === id);

  return (
    <>
      <div className="relative  text-center p-6 bg-white rounded-t-[38px]">
        <div className="relative z-10 flex items-center gap-4 mb-4">
          <div>
            <Avatar
              url={profile?.profile.profileImgUrl}
              onFileUpload={handleFileUpload}
            />
          </div>
          <div>
            <div className="font-bold text-xl text-left">
              {profile?.profile.displayName}
              <BxEdit
                className="inline-block"
                onClick={() => setShowProfileSettingsModal(true)}
              />
            </div>
            <div className=" text-left">{profile?.profile.username}</div>
            <div className=" flex text-left font-bold text-xs mt-2 gap-1">
              ID : <p>{profile?.profile.id}</p>
            </div>
          </div>
        </div>
        <div className="relative  bg-[#ECF4F6] rounded-3xl drop-shadow-sm h-full mx-6">
          {filteredData.map((item) => (
            <div
              className=" shadow-md  rounded-2xl w-full text-left px-8 py-4"
              key={item?.id}
            >
              <div className="relative z-10 text-center">
                <p className="text-2xl font-bold mb-2 drop-shadow-sm">
                  {item?.title}
                </p>
                <p className="text-left text-sm mb-2 drop-shadow-sm">
                  {item?.detatails}
                </p>
                <p className="text-lg font-bold mb-2 drop-shadow-sm">
                  {"หลักฐานการทำความดี"}
                </p>
                <div
                  className="bg-white w-full h-64 relative mb-4 text-[#7C7C7C] items-center text-sm flex flex-col justify-center gap-8"
                  onClick={handleClick}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Uploaded Image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img src={UploadIcon} alt="" />
                      <p>อัพโหลดหลักฐานการเข้าร่วมกิจกรรม</p>
                    </>
                  )}
                  <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>

                <div className=" flex text-left font-bold text-sm mt-2 gap-1">
                  Activity : <p className=" font-normal"> {item?.title}</p>
                </div>
                <div className=" flex text-left font-bold text-sm mt-2 gap-1">
                  Date :{" "}
                  <p className=" font-normal">
                    {" "}
                    {new Date(item.date).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative space-x-4 items-center my-6">
          <button
            className="bg-white py-2 px-6 rounded-full border border-1 border-primary text-sm"
            onClick={() => navigate("/csr")}
          >
            Back
          </button>
          <button
            className="bg-primary text-white py-2 px-6 rounded-full text-sm border border-1 border-primary "
            onClick={() => setShowSuccessModal(true)}
          >
            Confirm
          </button>
        </div>
      </div>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
        onRefresh={refreshProfile}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}

export default JoinActivityPage;

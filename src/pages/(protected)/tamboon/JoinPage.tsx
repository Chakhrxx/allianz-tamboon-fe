import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../profile/components/Avatar";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import UploadIcon from "@/assets/svgs/Upload.svg";
import { useProfile } from "@/hooks/useProfile";
import { queryClient } from "@/libs/query-client";
import { profileService } from "@/services/profile";
import ProfileSettingsModal from "../profile/components/ProfileSettingModal";
import SuccessModal from "./components/SuccessModal";
import { useMutation, useQuery } from "react-query";
import { tamboonService } from "@/services/tamboon";
import { requestTamboonService } from "@/services/request-tamboon";

function JoinActivityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { data: profile, refetch: refreshProfile } = useProfile({
    enabled: false,
  });
  const { data: tamboon } = useQuery(["tamboon", id], () =>
    tamboonService.getOne(Number(id))
  );
  const mutation = useMutation((data) => requestTamboonService.create(data));
  const mutationUploadImg = useMutation((file: File) =>
    requestTamboonService.uploadImg(file)
  );
  const mutationDeleteImg = useMutation((imageUrl: string) =>
    requestTamboonService.deleteImg(imageUrl)
  );

  if (!tamboon) return null;

  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      if (imageUrl !== "") {
        const filename = imageUrl.split("/").pop();
        if (!filename) return;
        await mutationDeleteImg.mutateAsync(filename.split("?")[0]);
      }
      const file = target.files[0];
      const url = await mutationUploadImg.mutateAsync(file);

      setImageUrl(url);
    }
  };

  const sendRequestTamboon = async () => {
    const data: {
      userId?: number;
      tamboonId?: string;
      uploadImage?: string;
    } = {
      userId: profile?.profile?.id,
      tamboonId: id,
    };
    if (imageUrl !== "") {
      data.uploadImage = imageUrl;
      try {
        const requestTamboon = await mutation.mutateAsync(data);
        setShowSuccessModal(true);
        return requestTamboon;
      } catch (error) {
        console.error("Error creating request Tamboon:", error);
      }
    }
  };

  if (!profile) return null;
  if (!tamboon) return null;

  return (
    <>
      <div className="relative  text-center p-6 bg-white rounded-t-[38px]">
        <div className="relative z-10 flex items-start gap-4 mb-4 ">
          <div>
            <Avatar
              url={profile?.profile.profileImgUrl}
              onFileUpload={handleFileUpload}
            />
            <div className=" inline-flex text-center font-semibold text-[11px] mt-2 gap-1">
              ID : <p>{profile?.profile.id}</p>
            </div>
          </div>
          <div>
            <div className="font-bold text-lg text-left">
              {profile?.profile.displayName} &nbsp;
              <BxEdit
                className="inline-block w-4 h-4"
                onClick={() => setShowProfileSettingsModal(true)}
              />
            </div>
            <div className=" text-left text-sm font-normal">
              {profile?.profile.username}
            </div>
          </div>
        </div>
        <div className="relative  bg-[#ECF4F6] rounded-3xl drop-shadow-sm h-full mx-2">
          <div
            className=" shadow-md  rounded-2xl w-full text-left px-8 py-4"
            key={tamboon?.id}
          >
            <div className="relative z-10 text-center">
              <p className="text-2xl font-medium mb-2 drop-shadow-sm">
                {tamboon?.activityName}
              </p>
              <p className="text-left font-medium text-sm mb-2 drop-shadow-sm">
                {tamboon?.description}
              </p>
              <p className="text-lg  font-medium mb-2 drop-shadow-sm">
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
                Activity :{" "}
                <p className=" font-normal"> {tamboon?.activityName}</p>
              </div>
              <div className=" flex text-left font-bold text-sm mt-2 gap-1">
                Date :{" "}
                <p className=" font-normal">
                  {" "}
                  {new Date(tamboon?.expiredDate).toLocaleDateString("th-TH", {
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
            onClick={sendRequestTamboon}
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

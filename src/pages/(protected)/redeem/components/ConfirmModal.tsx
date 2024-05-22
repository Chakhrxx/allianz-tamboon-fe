import { FC, useState } from "react";
import BaseModal from "@/components/BaseModal";
// import EmailIcon from "@/assets/svgs/email-icon.svg";

import Button from "@/components/Button";
// import EagleCoins from "@/assets/svgs/eagle-coin.svg";
import { useProfile } from "@/hooks/useProfile";
import SuccessModal from "./SuccessModal";
import BxEdit from "@/assets/svgs/bx-edit.svg?react";
import Avatar from "../../profile/components/Avatar";
import { profileService } from "@/services/profile";
import { queryClient } from "@/libs/query-client";
import ProfileSettingsModal from "../../profile/components/ProfileSettingModal";
import { redeemService } from "@/services/redeem";
import { useMutation, useQuery } from "react-query";
import { requestRedeemService } from "@/services/request-redeem";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  total: number;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  id,
  total,
}) => {
  const { data: profile, refetch: refetchProfile } = useProfile({
    enabled: false,
  });
  const { data: reedeemOne } = useQuery(["redeem", id], () =>
    redeemService.getOne(id)
  );

  const mutation = useMutation((data) => requestRedeemService.create(data));
  const mutationNotify = useMutation((message) =>
    requestRedeemService.sendNotify(message)
  );

  const [showProfileSettingsModal, setShowProfileSettingsModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const email = !profile?.profile.username.includes("@")
    ? `${profile?.profile.username}@test.com`
    : profile?.profile.username;

  const openModal = async () => {
    const data = {
      userId: profile?.profile.id,
      redeemId: id,
      total: total,
    };
    const request = await mutation.mutateAsync(data);
    console.log("request", request);

    const message = {
      ...data,
      displayName: profile?.profile?.displayName,
      email: !profile?.profile.username.includes("@")
        ? `${profile?.profile.username}@test.com`
        : profile?.profile.username,
      title: request?.redeem?.title,
      description: request?.redeem?.description,
      created: new Date(request.created).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    await mutationNotify.mutateAsync(message);

    setShowSuccessModal(true);
    onClose;
  };
  const handleFileUpload = async (file: File) => {
    await profileService.uploadProfileImage(file);
    queryClient.invalidateQueries("profile");
    refetchProfile();
  };
  if (!profile) return null;
  if (!reedeemOne) return null;
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className="modal-body" key={reedeemOne?.id}>
          <div className="p-4">
            <div className="space-y-3">
              <div className="relative z-10 flex text-center items-start gap-4 py-3 px-6 ">
                <div>
                  <Avatar
                    url={profile?.profile.profileImgUrl}
                    onFileUpload={handleFileUpload}
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-left">
                    {profile?.profile.displayName} &nbsp;
                    <BxEdit
                      className="inline-block w-4 h-4"
                      onClick={() => {
                        setShowProfileSettingsModal(true);
                      }}
                    />
                  </div>
                  <div className=" text-left text-sm font-normal">
                    {profile?.profile.username}
                  </div>
                  <div className=" text-left text-[11px] font-semibold ">
                    <span>ID :</span> <span>{profile?.profile.id}</span>
                  </div>
                </div>
              </div>
              <div className="px-10">
                <img
                  src={reedeemOne?.contentImage}
                  alt="Image Label"
                  className="w-full rounded-xl"
                />
                <div className="text-[#6A6A6A] font-normal  text-center pt-5 ">
                  คุณต้องการแลก
                </div>
                <div className=" font-normal pb-1 text-center pt-2 text-primary">
                  {reedeemOne?.title}
                </div>
                <div className="text-center text-[#6A6A6A] font-normal">
                  จำนวน {total} ชิ้น{"  "}
                  <span className="text-[#EDA23D] font-normal">
                    โดยใช้เหรียญทั้งหมด {reedeemOne?.coins * total} เหรียญ
                  </span>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="  font-normal text-[#6A6A6A] text-center">
                  โดยทางเจ้าหน้าที่จะติดต่อกลับทาง
                  <br />
                  <p className=" font-normal text-primary underline">{email}</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-4">
                <Button
                  className=" w-24  !py-2 !text-primary !bg-white !my-4 rounded-full font-normal text-base border border-primary !normal-case"
                  onClick={onClose}
                >
                  Back
                </Button>
                <Button
                  className=" w-24  !py-2  !my-4 rounded-full font-normal text-base border border-primary !normal-case"
                  onClick={() => openModal()}
                  variant="primary"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BaseModal>
      <ProfileSettingsModal
        isOpen={showProfileSettingsModal}
        onClose={() => setShowProfileSettingsModal(false)}
        onRefresh={refetchProfile}
      />
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          id={id}
          counter={total}
        />
      )}
    </>
  );
};

export default ConfirmModal;

import { FC, useState } from "react";
import BaseModal from "@/components/BaseModal";
import classNames from "classnames";
import ChangeNameForm from "./ChangeNameForm";
import { useMutation, useQueryClient } from "react-query";
import { profileService } from "@/services/profile";
import ChangePasswordForm from "./ChangePasswordForm";
import SuccessModal from "./ProfileSettingSucessModal";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const tabs = [
  {
    id: "changeName",
    label: "แก้ไขชื่อของคุณ",
  },
  {
    id: "changePassword",
    label: "แก้ไขรหัสผ่านของคุณ",
  },
];

const ProfileSettingsModal: FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  onRefresh,
}) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("changeName");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { mutate: changeName } = useMutation({
    mutationFn: profileService.changeDisplayName,
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
      onRefresh();
    },
  });

  const { mutate: changePassword } = useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
      onRefresh();
    },
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChangeNameSubmitted = (newName: string) => {
    changeName(newName);
    onClose();
    setShowSuccessModal(true);
  };

  const handleChangePasswordSubmitted = (newPassword: string) => {
    changePassword(newPassword);
    onClose();
    setShowSuccessModal(true);
  };

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className="modal-body">
          <div className="w-full bg-blue-800 flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={classNames("p-2 transition-all w-full text-white", {
                  "bg-primary": activeTab === tab.id,
                  "bg-inherit opacity-60": activeTab !== tab.id,
                })}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-5">
            {activeTab === "changeName" && (
              <ChangeNameForm
                onSubmit={({ name }) => handleChangeNameSubmitted(name)}
              />
            )}
            {activeTab === "changePassword" && (
              <ChangePasswordForm
                onSubmit={({ newPassword }) =>
                  handleChangePasswordSubmitted(newPassword)
                }
              />
            )}
          </div>
        </div>
      </BaseModal>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default ProfileSettingsModal;

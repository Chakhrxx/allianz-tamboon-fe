import { FC, useMemo, useState } from "react";
import BaseModal from "@/components/BaseModal";
import { useProfile } from "@/hooks/useProfile";
import Button from "@/components/Button";
import CloseIcon from "@/assets/svgs/close-icon.svg";
import { useForm } from "react-hook-form";
import TextField from "@/components/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SuccessModal from "./ContactStaffSucessModal";
import { useMutation } from "react-query";
import { requestContactStaffService } from "@/services/request-contact-staff";
import { LineService } from "@/services/line";

const validationSchema = yup.object().shape({
  detail: yup.string().trim().required(),
});

interface ContactStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactStaffModal: FC<ContactStaffModalProps> = ({ isOpen, onClose }) => {
  const { data: profile } = useProfile({ enabled: false });
  const mutation = useMutation((data) =>
    requestContactStaffService.create(data)
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const mutationNotify = useMutation(
    (message: {
      userId?: number;
      type?: string;
      displayName?: string;
      email?: string;
      description?: string;
      created?: string;
    }) => LineService.sendNotify(message)
  );

  const {
    formState: { isValid, isSubmitting },
    register,
    handleSubmit,
    // setError,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const shouldSubmitBtnDisabled = useMemo(
    () => !isValid || isSubmitting,
    [isSubmitting, isValid]
  );
  const onSubmit = handleSubmit(async (data) => {
    const requestData = {
      userId: profile?.profile.id,
      email: !profile?.profile.username.includes("@")
        ? `${profile?.profile.username}@test.com`
        : profile?.profile.username,
      detail: data.detail,
    };

    const response = await mutation.mutateAsync(requestData);
    if (!response) return null;
    const message = {
      ...requestData,
      displayName: profile?.profile?.displayName,
      type: "Contact Staff",
      description: response?.detail,
      created: new Date(response.created).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    await mutationNotify.mutateAsync(message);
    setShowSuccessModal(true);
    onClose();
    reset();
  });
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className="modal-body">
          <div className="w-full bg-white flex"></div>
          <div className="p-6">
            <div className=" relative">
              <div className="flex justify-between relative mb-0">
                <div></div>
                <h1 className="relative  font-semibold text-[18px] text-center pb-2">
                  Contact staff
                </h1>

                <button
                  className=" underline underline-offset-2 text-[16px]"
                  onClick={onClose}
                >
                  <img src={CloseIcon} alt="" className="w-[30px]" />
                </button>
              </div>
            </div>
            <form action="" onSubmit={onSubmit}>
              <div className=" space-y-1">
                <div className="mx-2">Detail</div>

                <textarea
                  {...register("detail")}
                  className="w-full bg-[#D9D9D9] rounded-xl h-36 text-[#404040]  p-3 focus:outline-none"
                ></textarea>

                <div className="mx-2 ">Employee E-mail</div>
                <TextField
                  className="w-full bg-[#D9D9D9] rounded-xl !text-[#404040] opacity-70 !p-3"
                  value={
                    !profile?.profile.username.includes("@")
                      ? `${profile?.profile.username}@test.com`
                      : profile?.profile.username
                  }
                  readOnly
                />

                <Button
                  className=" w-[85px] mx-auto !py-3 !bg-primary text-primary !mt-6 font-normal text-base rounded-full !normal-case"
                  disabled={shouldSubmitBtnDisabled}
                >
                  Send
                </Button>
              </div>
            </form>
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

export default ContactStaffModal;

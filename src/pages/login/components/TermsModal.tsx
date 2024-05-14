import BaseModal, { ModalProps } from "@/components/BaseModal";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { ChangeEventHandler, useState } from "react";

type Props = ModalProps & {
  onAccept: () => void | Promise<void>;
};

export default function TermsModal({ onAccept, ...props }: Props) {
  const [accepted, setAccepted] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setAccepted(evt.target.checked);
  };

  const handleClick = () => {
    if (!accepted) return;
    onAccept();
  };

  return (
    <BaseModal className="!bg-transparent" {...props}>
      <div className="flex flex-col justify-center p-10 bg-[#8B9CC2] rounded-xl min-h-64">
        <p className="leading-snug text-lg shadow-sm drop-shadow-xl indent-6 text-left text-white font-normal">
          Eagle Coins Application จะทำการเก็บรวบรวมเพื่อ ใช้ หรือ เปิดเผย วัน
          เดือน ปี เกิด (Date of Birth) ต่อบริษัท Box Exhibit
          เพื่อการเข้าร่วมและจัดกิจกรรม
        </p>

        <br />
        <p className="leading-snug text-lg shadow-sm drop-shadow-xl indent-6 text-left text-white font-normal">
          Eagle Coins Eagle Coins Application will process your Date of Birth
          for the purpose relating to organizing Eagle Coins activity.
        </p>
        <div className="flex items-center gap-4 mt-10">
          <Checkbox
            id="accept-terms"
            className="border-white"
            onChange={handleChange}
          />
          <label
            htmlFor="accept-terms drop-shadow-xl"
            className="text-white font-normal"
          >
            I agree to the terms and conditions
          </label>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            className="relative max-w-[110px] !normal-case !py-2 !mt-8 rounded-full bg-[#00378154] bg-opacity-33 mx-auto !text-lg !font-normal"
            onClick={handleClick}
            disabled={!accepted}
          >
            {accepted ? "Next" : "Close"}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}

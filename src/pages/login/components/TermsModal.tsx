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
      <div className="flex flex-col justify-center p-5 bg-[#8B9CC2] rounded-xl min-h-64">
        <h1 className="text-2xl font-bold mb-4 drop-shadow-xl">
          Terms & Conditions
        </h1>
        <p className="leading-snug text-lg shadow-sm drop-shadow-xl">
          Allianz word run 2024 จะทำการเก็บรวบ รวมเพื่อ ใช้ หรือ
          เปิดเผยรหัสเอเจนท์ (Agent code) ต่อบริษัท Box Exhibit เพื่อการเข้าร่วม
          และจัดกิจกรรม Allianz word run 2024
          <br />
          <br />
          Allianz word run 2024 will process your Agent code and date of birth
          for the purpose relating to organizing Allianz word run 2024
        </p>
        <div className="flex items-center gap-4 mt-10">
          <Checkbox
            id="accept-terms"
            className="border-[#1E72B8]"
            onChange={handleChange}
          />
          <label htmlFor="accept-terms drop-shadow-xl">
            I agree to the terms and conditions
          </label>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            className="w-[120px] mt-8 rounded-full"
            // variant="warning"
            onClick={handleClick}
            disabled={!accepted}
          >
            NEXT
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}

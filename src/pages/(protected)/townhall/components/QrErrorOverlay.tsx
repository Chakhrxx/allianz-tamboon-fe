import Button from "@/components/Button";
import XCircleIcon from "@/assets/svgs/x-circle.svg?react";

export type QrErrorOverlayState = {
  show: boolean;
  title: string;
  message?: string;
};

type Props = {
  show: boolean;
  title: string;
  message?: string;
  onBack: () => void;
};

export default function QrErrorOverlay({
  show,
  title,
  message,
  onBack,
}: Props) {
  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 flex flex-col justify-center p-8 gap-32 z-50 text-white">
        <div>
          <XCircleIcon className="mx-auto" />
          <div className="leading-5 text-center italic">
            <h1 className="font-bold text-lg">{title}</h1>
            <p className="leading-5">{message}</p>
          </div>
        </div>

        <div className="space-y-2 w-full">
          <Button className="w-full" variant="warning" onClick={onBack}>
            OK
          </Button>
        </div>
      </div>
    )
  );
}

import classNames from "classnames";
import CameraIcon from "@/assets/svgs/camera.svg?react";
import { useRef } from "react";
import { CommonUtil } from "@/utils/common";

type Props = {
  url?: string | null;
  containerClassName?: string;
  onFileUpload?: (file: File) => void;
};

function Avatar({ url, containerClassName, onFileUpload }: Props) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const openFileUpload = () => fileUploadRef.current?.click();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const resizedFile = await CommonUtil.resizeImage(file);
    onFileUpload?.(resizedFile);
  };

  return (
    <div
      className={classNames("relative w-fit", containerClassName)}
      onClick={openFileUpload}
    >
      <input
        ref={fileUploadRef}
        type="file"
        hidden
        onChange={handleFileChange}
      />

      {url ? (
        <div className="w-20 h-20 border-4 border-white rounded-full overflow-hidden shadow-xl">
          <img
            className="w-full h-full object-cover"
            src={url}
            alt="Profile image"
          />
        </div>
      ) : (
        <div
          className={classNames(
            "w-20 h-20 border-4 rounded-full flex justify-center items-center",
            {
              "bg-white": !url,
            }
          )}
        ></div>
      )}

      <CameraIcon className="absolute bottom-4 -right-1 z-10" />
    </div>
  );
}

export default Avatar;

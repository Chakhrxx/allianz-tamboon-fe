import { FC } from "react";
import MeritModal from "@/components/MeritModal";
import { Link } from "react-router-dom";
import Avatar from "../../profile/components/Avatar";
import { useProfile } from "@/hooks/useProfile";

interface DataItem {
  title: string;
  descriptions: string;
  url: string;
  video: string;
  imageUrl: string;
}

interface ActivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DataItem;
}

const DetailModal: FC<ActivesModalProps> = ({ isOpen, onClose }) => {
  const { data: profile } = useProfile({ enabled: false });

  return (
    <MeritModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-blue-800 flex"></div>
        <div className="p-5">
          <form className="relative z-10 text-center space-y-5 pb-10 mt-5">
            <label className="text-2xl font-bold">กิจกกรมคัดแยกขยะ</label>
            <div className="relative z-10 flex items-center justify-center gap-4">
              <Avatar
                url={profile?.profile.profileImgUrl}
                // onFileUpload={handleFileUpload}
              />
              <div>
                <div className="font-bold text-xl">
                  {profile?.profile.displayName}{" "}
                </div>
                <div>{profile?.profile.username}</div>
              </div>
            </div>
            <div className="font-bold text-left px-5">มอบคะแนน</div>
            <div className="relative space-x-10 items-center">
              <button className="bg-white text-gray-700 p-2 rounded-sm w-24 font-bold border border-1">
                5
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-sm w-24 font-bold border border-1">
                10
              </button>
            </div>
            <div className="relative space-x-10 items-center">
              <button className="bg-white text-gray-700 p-2 rounded-sm w-24 font-bold border border-1">
                15
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-sm w-24 font-bold border border-1">
                20
              </button>
            </div>
            <div className="relative space-x-10 items-center">
              <button className="bg-white text-gray-700 p-2 rounded-sm w-24 font-bold border border-1">
                25
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-sm w-24 font-bold border border-1">
                30
              </button>
            </div>
            <div className="font-bold text-left px-5">กรอกคะแนนพิเศษ</div>
            <input
              type="number"
              name=""
              id=""
              className="border border-1 p-1"
            />

            <div className="relative space-x-4 items-center">
              <button className="bg-white text-gray-700 py-1 px-2 rounded-sm w-24 font-bold border border-1">
                Close
              </button>
              <button className="bg-gray-700 text-white py-1 px-2 rounded-sm w-24 font-bold">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </MeritModal>
  );
};

export default DetailModal;

import { FC } from "react";
import MeritModal from "@/components/MeritModal";
import { Link } from "react-router-dom";

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

const DetailModal: FC<ActivesModalProps> = ({ data, isOpen, onClose }) => {
  return (
    <MeritModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-blue-800 flex"></div>
        <div className="p-5">
          <form className="relative z-10 text-center space-y-5 pb-10 mt-5">
            <label className="text-2xl font-bold">{data?.title}</label>
            <img
              className="w-full border border-collapse"
              src={data?.imageUrl}
              alt=""
              style={{ height: "200px" }}
            />
            <div className="text-left text-md">
              {data?.title}
              <p className="text-left pl-4 text-sm text-gray-600">
                {data?.descriptions}
              </p>
            </div>

            <p className="text-left  text-md">รายละเอียดกิจกรรม : </p>
            <Link className="text-left  text-md underline" to={`${data?.url}`}>
              <p className="text-left pl-4 text-sm text-primary">
                {`${data?.url}`}
              </p>
            </Link>
            <iframe
              className="w-full "
              height="210"
              src={data?.video}
              title="FB2024 - web Instruction phase1 no QR"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

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

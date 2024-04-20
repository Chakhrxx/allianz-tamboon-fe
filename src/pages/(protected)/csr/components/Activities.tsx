import { useState } from "react";
import ActivesModal from "./DetailModal";
import JoinModal from "./JoinModal";

interface ActivesItem {
  id: string;
  point: number;
  title: string;
  descriptions: string;
  url: string;
  video: string;
  imageUrl: string;
  date: number;
}

type Props = {
  data: ActivesItem[];
};

function Actives({ data }: Props) {
  const [showActivesModal, setShowActivesModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenModal = (item: ActivesItem) => {
    setSelectedData(item);
    setShowActivesModal(true);
  };

  const handleCloseModal = () => {
    setShowActivesModal(false);
  };
  return (
    <>
      <div className="font-bold text-left">Actives</div>
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex flex-wrap gap-4">
          {data.map((item) => (
            <div
              className="bg-white shadow-md p-4 rounded-md w-full text-left"
              key={item.id}
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">{item.title}</div>
                <div className="text-sm font-bold">{item.point} CSR</div>
              </div>
              <div className="pb-2">รายละเอียดกิจกรรม...</div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500 text-sm">
                  Expired :{" "}
                  {new Date(item.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-gray-700 text-white py-1 px-2 rounded-sm"
                    onClick={() => handleOpenModal(item)}
                  >
                    รายละเอียด
                  </button>
                  <button
                    className="bg-gray-700 text-white py-1 px-2 rounded-sm hover:bg-red-600"
                    onClick={() => handleOpenModal(item)}
                  >
                    เข้าร่วม
                  </button>
                </div>
              </div>
              <ActivesModal
                data={selectedData}
                isOpen={showActivesModal}
                onClose={handleCloseModal}
              />
              <JoinModal
                data={selectedData}
                isOpen={showActivesModal}
                onClose={handleCloseModal}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Actives;

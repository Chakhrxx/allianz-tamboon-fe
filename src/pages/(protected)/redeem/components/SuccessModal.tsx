import { FC } from "react";
import BaseModal from "@/components/BaseModal";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

interface ContactStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  total: number;
}

const SuccessModal: FC<ContactStaffModalProps> = ({
  isOpen,
  onClose,
  id,
  total,
}) => {
  const navigate = useNavigate();
  const data = [
    {
      id: "1",
      title: "แพ็คเกจทัวร์ กระบี่ 3 วัน 2 คืน",
      descriptions: `เที่ยวหน้าหนาวกระบี่ ตั๋วเครื่องบินไป-กลับ พร้อมที่พัก 3 วัน 2
      คืนกับ Air Asia SNAP`,
      useCoins: 320,
      expired: "31 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      total: 4,
    },
    {
      id: "2",
      title: "Passion Delivery Gift Voucher. Value 1000 baht.",
      descriptions: `Passion Delivery gift vouchers are the perfect gift for any occasion.
      The recipient can choose from over 1500 products from 50+ shops.`,
      useCoins: 100,
      expired: "31 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
      total: 1,
    },
    {
      id: "3",
      title: "Wonka Chocolate Factory Personal lised Golden Ticket",
      descriptions: `This ticket gives every child a unique 
      adventure in Willy Wonka’s factory. In 
      Roald Dahl’s original,there were only five Golden Tickets in the whole world. 
      `,
      useCoins: 150,
      expired: "25 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
      total: 3,
    },
    {
      id: "4",
      title: "เเพ็กเก็จเที่ยวเชียงใหม่ ตั๋วเครื่องบินไป-กลับ พร้อมที่พัก",
      descriptions: `   เที่ยวหน้าหนาวเชียงใหม่ ตั๋วเครื่องบินไป-กลับ
      พร้อมที่พัก 3 วัน 2 คืนกับ AirAsia SNAP . 
      `,
      useCoins: 150,
      expired: "25 Jul 2024",
      imageUrl:
        "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
      total: 2,
    },
  ];
  const filteredData = data.filter((item) => item?.id === id);
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-white flex"></div>

        {filteredData.map((item) => (
          <div className="p-8" key={item?.id}>
            <div className="text-center space-y-4">
              <div className=" font-bold  text-3xl">Your coins is Return</div>
              <img src={item?.imageUrl} alt="" className=" rounded-3xl" />
              <div className=" font-bold text-[#555555]">
                รายการของเเลกของรางวัลของคุณอนุมัติเรียบร้อย !
              </div>
              <div className=" font-bold">{item?.title}</div>
              <div className="text-center text-[#6A6A6A] font-medium">
                จำนวน {total} ชิ้น{" "}
                <span className="text-[#EDA23D]">
                  โดยใช้เหรียญทั้งหมด {item?.useCoins * total} เหรียญ
                </span>
              </div>
              <Button
                className="mx-auto !py-2 !normal-case text-white !mt-6 font-normal text-base rounded-full"
                onClick={() => {
                  onClose();
                  navigate("/redeem");
                }}
              >
                Close
              </Button>
            </div>
          </div>
        ))}
      </div>
    </BaseModal>
  );
};

export default SuccessModal;

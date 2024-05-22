import EagleCoins from "@/assets/images/eaglecoin 4.png";
import { useProfile } from "@/hooks/useProfile";
import { tamboonService } from "@/services/tamboon";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function Actives() {
  const navigate = useNavigate();
  const { data: profile } = useProfile({ enabled: false });
  const { data: tamboon } = useQuery(["tamboon", profile?.profile.id], () =>
    tamboonService.getByUserId(profile?.profile.id ?? 0)
  );

  if (!profile) return null;
  if (!tamboon) return null;

  return (
    <>
      <div className="font-bold text-left text-base pb-2">Activity</div>
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex flex-wrap gap-4">
          {tamboon.map((item) => (
            <div
              className="bg-[#ECF4F6] shadow-md px-4 py-2 rounded-2xl w-full text-left"
              key={item.id}
            >
              <div className="flex justify-between items-center">
                <div className=" text-base font-bold font-inter">
                  {item?.activityName}
                </div>
                <div className="relative z-10 flex items-center justify-center gap-2  ">
                  <img className=" h-9" src={EagleCoins} alt="Eagle Coin" />
                  <div>
                    <div className="text-left font-semibold text-xl text-[#EDA740] drop-shadow">
                      {item?.point}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2 py-2 text-sm font-inter">
                {item.description.length > 50
                  ? `${item.description.substring(0, 50)} ...`
                  : `${item.description} ...`}
              </div>
              <div className="flex justify-between items-center my-2">
                <div className="text-red-400  text-sm">
                  Expired :{" "}
                  {new Date(item?.expiredDate).toLocaleDateString("th-TH", {
                    // year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </div>
                <div className="flex space-x-2 pl-2">
                  <button
                    className="bg-white py-1 px-4 rounded-full border-2 border-primary text-sm"
                    onClick={() => navigate(`/csr/${item?.id}`)}
                  >
                    Detail
                  </button>
                  <button
                    className="bg-primary text-white py-1 px-6 rounded-full text-sm"
                    onClick={() => navigate(`/csr/join/${item?.id}`)}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Actives;

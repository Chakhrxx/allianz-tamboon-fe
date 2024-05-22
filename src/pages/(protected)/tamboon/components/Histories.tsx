import { useProfile } from "@/hooks/useProfile";
import { requestTamboonService } from "@/services/request-tamboon";
import { useQuery } from "react-query";

function Histories() {
  const { data: profile } = useProfile({ enabled: false });
  const { data: tamboon } = useQuery(
    ["requestTamboon", profile?.profile.id],
    () => requestTamboonService.getByUserId(profile?.profile.id ?? 0)
  );
  if (!profile) return null;
  if (!tamboon) return null;

  return (
    <>
      <div className="font-bold text-left text-md py-2">History</div>
      <div className="flex flex-wrap gap-2 justify-center">
        {tamboon.map((item) => (
          <div
            className="bg-[#ECF4F6] border-2 boder-[#DCDCDC] px-4 py-1 rounded-full w-full text-left"
            key={item?.id}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-md font-bold font-inter">
                  {item?.tamboon?.activityName}
                </div>
                <div className="text-red-400 text-[12px]">
                  Date :{" "}
                  {new Date(item.created).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    // hour: "2-digit",
                    // minute: "2-digit",
                  })}
                </div>
              </div>
              <div
                className={`${
                  item.status === "Waiting"
                    ? "bg-white text-primary border border-primary"
                    : item.status === "Accept"
                    ? "bg-primary text-white"
                    : "bg-red-500 text-white"
                }   py-1 px-4 w-24 text-sm rounded-full flex items-center justify-center `}
              >
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Histories;

import EagleCoins from "@/assets/images/eaglecoin 4.png";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "react-query";
import { redeemService } from "@/services/redeem";
import { useNavigate } from "react-router-dom";
function RedeemPage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile({ enabled: false });
  const { data: redeem } = useQuery(["redeem", profile?.profile.id], () =>
    redeemService.getByUserId(profile?.profile.id ?? 0)
  );

  if (!profile) return null;
  if (!redeem) return null;
  const latest = redeem[redeem.length - 1];

  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white rounded-t-[38px]">
        <div className=" relative">
          <img
            src={latest?.coverImage}
            alt=""
            className="w-full h-[210px] object-cover mx-auto rounded-2xl"
          />
          <div className=" absolute flex bottom-0 right-0 rounded-tl-xl bg-[#FAEDA2] drop-shadow-2xl px-6 py-1 items-center h-[46px]">
            <img src={EagleCoins} alt="" className="w-10" />
            <div className="text-[#EDA23D] drop-shadow-sm font-semibold text-xl leading-none">
              {latest?.coins}
              <p className="text-[#EDA23D] font-extralight text-sm drop-shadow-sm leading-none">
                eagle coins
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center text-center p-1 bg-gradient-to-r from-[#7DD1E8] from-22% to-[#19A2DE] to-84% rounded-b-[38px] drop-shadow-lg items-center gap-2 mx-auto w-3/4">
          <img src={EagleCoins} alt="" className="w-12" />
          <p className="text-white font-semibold text-lg drop-shadow-sm gap-2">
            You have {profile?.coins} coins
          </p>
        </div>
        <div className="font-semibold text-lg text-left mt-4  drop-shadow-md">
          All Rewards
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {redeem.map((item) => (
            <div
              onClick={() => navigate(`/redeem/show/${item?.id}`)}
              key={item?.id}
            >
              <div className=" relative  my-2 rounded-2xl drop-shadow-2xl h-full ">
                <div className=" relative">
                  <img
                    src={item?.coverImage}
                    alt=""
                    className="rounded-t-2xl border-b-0 border-[3px] border-white"
                  />
                  <div className=" absolute flex bottom-0 right-0 rounded-tl-xl bg-[#FAEDA2] drop-shadow-2xl px-2 items-center">
                    <img src={EagleCoins} alt="" className="w-6" />
                    <div className="text-[#EDA23D] drop-shadow-sm font-semibold text-base leading-none py-1">
                      {item?.coins}
                      <p className="text-[#EDA23D] font-extralight text-xs drop-shadow-sm leading-none ">
                        eagle coins
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative bg-white px-3 py-2 h-[120px]">
                  <p className="font-semibold text-sm text-left pb-2 text-black">
                    {item?.title?.length > 40
                      ? `${item?.title.substring(0, 40)}...`
                      : item?.title}
                  </p>
                  <p className=" text-xs text-left font-thin indent-4 text-black">
                    {item?.description?.length > 50
                      ? `${item?.description.substring(0, 50)}...`
                      : item?.description}
                  </p>
                </div>
                <div className="relative flex justify-center text-center p-1 bg-gradient-to-r from-[#7DD1E8] from-22% to-[#19A2DE] to-84% rounded-b-xl drop-shadow-lg items-center">
                  <p className="text-white font-bold text-lg drop-shadow-sm gap-1">
                    Redeem
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RedeemPage;

import { useProfile } from "@/hooks/useProfile";
import { useMemo } from "react";
import QRCode from "react-qr-code";

function ProfilePage() {
  const { data: profile } = useProfile();

  const qrValue = useMemo(() => {
    return JSON.stringify({
      id: profile?.profile.id,
      displayName: profile?.profile.displayName,
      username: profile?.profile.username,
      branchId: profile?.profile.branchId,
    });
  }, [profile]);

  return (
    <div className="relative z-10 text-center space-y-5 pb-10 mt-5">
      <div className="font-bold">Scan QR to play Sports Experience</div>
      <div className="border-2 border-primary bg-white w-fit mx-auto p-5 rounded-xl">
        <QRCode fgColor="#003781" value={qrValue} />
      </div>
    </div>
  );
}

export default ProfilePage;

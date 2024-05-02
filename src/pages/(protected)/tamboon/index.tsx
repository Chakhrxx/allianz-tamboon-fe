import Actives from "./components/Activities";
import Histories from "./components/Histories";

function CSRPage() {
  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white rounded-t-[38px]">
        <div className="bg-[#D9D9D9] w-48 h-3 rounded-full mx-auto"></div>
        <Actives />
        <Histories />
      </div>
    </>
  );
}

export default CSRPage;

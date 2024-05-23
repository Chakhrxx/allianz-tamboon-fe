import Actives from "./components/Activities";
import Histories from "./components/Histories";

function CSRPage() {
  return (
    <>
      <div className="relative z-10 text-center p-6 bg-white rounded-t-[38px]">
        <Actives />
        <Histories />
      </div>
    </>
  );
}

export default CSRPage;

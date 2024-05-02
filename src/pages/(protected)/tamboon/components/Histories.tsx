function Histories() {
  const data = [
    { title: "กิจกรรมคัดแยกขยะ", status: "Waiting", date: 1709624582000 },
    { title: "กิจกกรรมล้างจาน", status: "Approve", date: 1709249522000 },
    { title: "กิจกกรรมเพิ่มเติม", status: "Reject", date: 1709105882000 },
  ];
  return (
    <>
      <div className="font-bold text-left text-md py-2">History</div>
      <div className="flex flex-wrap gap-2 justify-center">
        {data.map((item, index) => (
          <div
            className="bg-[#ECF4F6] border-2 boder-[#DCDCDC] px-4 py-1 rounded-full w-full text-left"
            key={index}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-md font-bold font-inter">{item.title}</div>
                <div className="text-red-400 text-sm">
                  Date :{" "}
                  {new Date(item.date).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div
                className={`${
                  item.status === "Waiting"
                    ? "bg-white text-primary border border-primary"
                    : item.status === "Approve"
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

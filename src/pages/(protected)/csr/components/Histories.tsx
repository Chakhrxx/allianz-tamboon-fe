function Histories({ data }) {
  return (
    <>
      <div className="font-bold text-left">History</div>
      <div className="flex flex-wrap gap-2 justify-center">
        {data.map((item, index) => (
          <div
            className="bg-white shadow-md p-4 rounded-md w-full text-left"
            key={index}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold">{item.title}</div>
                <div className="text-gray-500 text-sm">
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
                className={`bg-${
                  item.status === "Waiting"
                    ? "yellow"
                    : item.status === "Approve"
                    ? "green"
                    : "red"
                }-500 text-white py-1 px-2 rounded-md w-20 flex items-center justify-center`}
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

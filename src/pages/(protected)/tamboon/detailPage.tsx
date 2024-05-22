import { tamboonService } from "@/services/tamboon";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: tamboon } = useQuery(["tamboon", id], () =>
    tamboonService.getOne(Number(id))
  );

  if (!tamboon) return null;
  return (
    <>
      <div className="relative  text-center p-6 bg-white rounded-t-[38px]">
        <div className="relative  bg-[#ECF4F6] rounded-3xl drop-shadow-sm h-full">
          <div
            className=" shadow-md  rounded-2xl w-full text-left px-10 py-4"
            key={tamboon?.id}
          >
            <div className="relative z-10 text-center">
              <p className="text-2xl font-bold mb-2 drop-shadow-sm">
                {tamboon?.activityName}
              </p>
              <img
                className="w-full border border-collapse mb-2"
                src={tamboon?.contentImage}
                alt=""
                style={{ height: "150px" }}
              />
              <div className="text-left text-md font-bold mb-2 drop-shadow-sm">
                {tamboon?.activityName}
                <p className="text-left pl-4 text-sm font-normal mt-2 drop-shadow-sm">
                  {tamboon?.description}
                </p>
              </div>

              <p className="text-left  text-sm font-normal">
                รายละเอียดกิจกรรม :{" "}
              </p>
              <Link className="text-left  text-sm underline" to={tamboon?.link}>
                <div className="text-left  text-sm text-[#0066DE] indent-4 break-words overflow-hidden prose">
                  {tamboon?.link}
                </div>
              </Link>

              <iframe
                className="my-2 w-full"
                height="210"
                src={
                  tamboon?.linkVideo.split("watch?v=").length != 1
                    ? tamboon?.linkVideo.split("watch?v=")[0] +
                      "embed/" +
                      tamboon?.linkVideo.split("watch?v=")
                    : `https://www.youtube.com/embed/${
                        tamboon?.linkVideo.split("/")[3]
                      }`
                }
                title={tamboon?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              <div className="relative space-x-4 tamboons-center my-4">
                <button
                  className="bg-white py-2 px-8 rounded-full border border-1 border-primary text-sm"
                  onClick={() => navigate("/csr")}
                >
                  Close
                </button>
                <button
                  className="bg-primary text-white py-2 px-8 rounded-full text-sm border border-1 border-primary "
                  onClick={() => navigate(`/csr/join/${tamboon?.id}`)}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;

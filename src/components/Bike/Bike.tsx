import Image from "next/image";
import { IBike } from "types";
import fallback from "../../../public/img/no-image.png";

const Bike = ({ bike }: { bike: IBike }) => {
  const unixToDate = (unixDate: number) => {
    const date = new Date(unixDate * 1000);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="mb-3 overflow-hidden rounded bg-white p-1 shadow">
      <div className="flex">
        <div className="min-w-72 h-64 w-4/12">
          <Image
            className="h-full w-full object-cover"
            src={bike.thumb ?? fallback.src}
            alt={bike.title}
            width={200}
            height={200}
          />
        </div>
        <div className="w-8/12 p-5">
          <h2 className="mt-0 text-base">{bike.title}</h2>
          <p>
            <span className="font-bold">Location:</span>{" "}
            {bike.stolen_location ? bike.stolen_location : "N/A"}
          </p>
          <p>
            <span className="font-bold">Stolen on:</span>{" "}
            {bike.date_stolen ? unixToDate(bike.date_stolen) : "N/A"}
          </p>
          {/* There is no reported on field returned in the API */}
          {/* <p><span className="font-bold">Reported on:</span> {bike.description ? bike.description : 'N/A'}</p> */}
          <p>
            <span className="font-bold">Description:</span>{" "}
            {bike.description ? bike.description : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bike;

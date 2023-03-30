import Image from "next/image";
import { Bike } from "types";
import fallback from "../../../public/img/no-image.png";
import { Button } from "antd";
import { unixToDate } from "~/helper";

const Bike = ({
  bike,
  onReadMoreToggle,
}: {
  bike: Bike;
  onReadMoreToggle: (id: number | null) => void;
}) => {
  return (
    <div className="single-bike mb-3 overflow-hidden rounded bg-white p-1 shadow">
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
            <span className="bike-location">
              {bike.stolen_location ? bike.stolen_location : "N/A"}
            </span>
          </p>
          <p>
            <span className="font-bold">Stolen on:</span>{" "}
            <span className="bike-stolen">
              {bike.date_stolen ? unixToDate(bike.date_stolen) : "N/A"}
            </span>
          </p>
          <p>
            <span className="font-bold">Description:</span>{" "}
            <span className="bike-description">
              {bike.description ? bike.description : ""}
            </span>
          </p>
          <Button
            type="link"
            onClick={() => onReadMoreToggle(bike.id)}
            className="cursor-pointer p-0"
          >
            <span className="no-underline hover:!underline">Read more</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bike;

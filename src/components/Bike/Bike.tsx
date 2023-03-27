import Image from "next/image";
import { Bike } from "types";
import fallback from "../../../public/img/no-image.png";
import {Button} from "antd";
import { unixToDate } from "~/helper";

const Bike = ({ bike, setSelectedBikeId }: { bike: Bike, setSelectedBikeId: React.Dispatch<React.SetStateAction<number | null>> }) => {
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
          <p>
            <span className="font-bold">Description:</span>{" "}
            {bike.description ? bike.description : "N/A"}
          </p>
          <Button type="link" onClick={() => setSelectedBikeId(bike.id)} className="p-0 cursor-pointer">
            <span className="no-underline hover:!underline">Read more</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bike;

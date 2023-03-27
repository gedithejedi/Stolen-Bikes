import Image from "next/image";
import { IBike } from "types";
import fallback from "../../../public/img/no-image.png"

const Bike = ({bike}:{bike:IBike}) => {

  const unixToDate = (unixDate: number) => {
    const date = new Date(unixDate * 1000);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <div className="rounded w-full bg-white shadow mb-3 overflow-hidden p-1">
        <div className="flex">
            <div className="w-4/12 min-w-72 h-64">
              <Image className="w-full h-full object-cover" src={bike.thumb ?? fallback.src} alt={bike.title} width={200} height={200}/>
            </div>
            <div className="p-5 w-8/12">
              <h2 className="text-base mt-0">{bike.title}</h2>
              <p><span className="font-bold">Location:</span> {bike.stolen_location ? bike.stolen_location : 'N/A'}</p>
              <p><span className="font-bold">Stolen on:</span> {bike.date_stolen ? unixToDate(bike.date_stolen) : 'N/A'}</p>
              {/* There is no reported on field returned in the API */}
              {/* <p><span className="font-bold">Reported on:</span> {bike.description ? bike.description : 'N/A'}</p> */}
              <p><span className="font-bold">Description:</span> {bike.description ? bike.description : 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default Bike 
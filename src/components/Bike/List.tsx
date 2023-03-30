import BikeComponent from "~/components/Bike/Bike";
import { Empty, Modal } from "antd";
import { type Bike as BikeType } from "types";
import { unixToDate } from "~/helper";

const List = ({
  bikes,
  selectedBike,
  selectedBikeId,
  onReadMoreToggle,
}: {
  bikes: BikeType[];
  selectedBike: BikeType | null | undefined;
  selectedBikeId: number | null;
  onReadMoreToggle: (id: number | null) => void;
}) => {
  return (
    <>
      <div className="flex flex-col">
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <BikeComponent
              key={bike.id}
              bike={bike}
              onReadMoreToggle={onReadMoreToggle}
            />
          ))
        ) : (
          <Empty
            className="rounded bg-transparent p-16 shadow"
            description="No bikes found please adjust your filters or try again."
          />
        )}
      </div>
      <Modal
        title="Extra Bike Information"
        open={selectedBikeId !== null}
        footer={null}
        onCancel={() => onReadMoreToggle(null)}
      >
        <p>
          <span className="font-bold">Registration created at: </span>
          {selectedBike?.registration_created_at
            ? unixToDate(selectedBike.registration_created_at)
            : "N/A"}
        </p>
        <p>
          <span className="font-bold">Registration updated at: </span>
          {selectedBike?.registration_updated_at
            ? unixToDate(selectedBike.registration_updated_at)
            : "N/A"}
        </p>
      </Modal>
    </>
  );
};

export default List;

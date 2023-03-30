import List from "~/components/Bike/List";
import { render, screen } from "@testing-library/react";
import { BikesMock, BikesEmptyMock } from "../../bikes";

// Test Suite for Bike List component
describe("List", () => {
  it("renders the correct number of bikes", () => {
    if (BikesMock.bikes) {
      const { container, debug } = render(
        <List
          bikes={BikesMock.bikes}
          selectedBike={null}
          selectedBikeId={null}
          onReadMoreToggle={(id: number | null) => {}}
        />
      );

      const allBikes = container.querySelectorAll(".single-bike");
      expect(allBikes.length).toEqual(BikesMock.bikes?.length);

      if (allBikes.length == 0)
        expect(
          screen.getByText("2022 Cube Cube Nuride Hybrid Performance Allroad")
        ).toBeInTheDocument();
    }
  });
});

import Bike from "~/components/Bike/Bike";
import { render } from "@testing-library/react";
import { BikeMock } from "../../bikes";
import { unixToDate } from "~/helper";

// Test Suite for Bike component
describe("Bike", () => {
  it("renders crrectly with props", () => {
    const { debug, container } = render(
      <Bike bike={BikeMock} onReadMoreToggle={(id: number | null) => {}} />
    );
    const { title, stolen_location, date_stolen, description } = BikeMock;

    const h2Text = container.querySelector(".single-bike h2")?.textContent;
    expect(h2Text).toBe(title);

    const locationText = container.querySelector(
      ".single-bike .bike-location"
    )?.textContent;
    expect(locationText).toBe(stolen_location);

    const stolenText = container.querySelector(
      ".single-bike .bike-stolen"
    )?.textContent;
    expect(stolenText).toBe(date_stolen ? unixToDate(date_stolen) : "N/A");

    const descriptionText = container.querySelector(
      ".single-bike .bike-description"
    )?.textContent;
    expect(descriptionText).toBe(description);
  });
});

import Container from "~/components/Bike/Container";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BikesMock } from "../../bikes";

// Create a mock for axios
const mockAxios = new MockAdapter(axios);

// Test Suite for Container component
describe("Container", () => {
  const queryClient = new QueryClient();
  
  it("should render the error state", async () => {
    mockAxios.onGet("https://bikeindex.org:443/api/v3/search").reply(200, {
      BikesMock,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Container />
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading..")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  it("should render correctly", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Container />
      </QueryClientProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

import {
  Pagination,
  PaginationProps,
  Input,
  DatePicker,
  Tooltip,
} from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type {
  GetBikeResponse,
  GetBikeCountResponse,
  GetBikeDataResponse,
} from "types";
import List from "./List";

const { RangePicker } = DatePicker;
const BASE_URL = "https://bikeindex.org:443/api/v3";
const POSTS_PER_PAGE = 10;
const LOCATION = "Munich";
//const LOCATION = "North Pole"; // uncomment to get no results

const Container = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);  const [filterText, setFilterText] = useState<string>("");
  const [selectedBikeId, setSelectedBikeId] = useState<number | null>(null);

  const getAllBikes = async () => {
    const { data } = await axios.get<GetBikeResponse>(BASE_URL + "/search", {
      // The settings as needed
      params: {
        page: currentPage,
        per_page: POSTS_PER_PAGE,
        location: LOCATION,
        stolenness: "proximity",
        query: filterText,
      },
    });
    return data.bikes;
  };

  const getBikesCount = async () => {
    console.log("Called");
    const { data } = await axios.get<GetBikeCountResponse>(
      BASE_URL + "/search/count",
      {
        params: {
          location: LOCATION,
          stolenness: "proximity",
          query: filterText,
        },
      }
    );
    return data;
  };

  const getBikeById = async () => {
    if (selectedBikeId == null) return null;
    const { data } = await axios.get<GetBikeDataResponse>(
      BASE_URL + "/bikes/" + selectedBikeId
    );
    return data.bike;
  };

  // Query to get the bikes
  const { data, isError, isLoading } = useQuery({
    queryKey: ["bikes", currentPage, filterText],
    queryFn: () => getAllBikes(),
    keepPreviousData: true,
    onError: (error:AxiosError) => {
      console.error(`Something went wrong with fetching the bikes: ${error}`);
    },
  });

  const {
    data: count,
    isLoading: isCountLoading,
    isFetching: isCountFetching,
  } = useQuery({
    queryKey: ["bikeCount", filterText],
    queryFn: getBikesCount,
    keepPreviousData: true,
    onError: (error:AxiosError) => {
      console.error(`Something went wrong with fetching the count: ${error}`);
    },
  });

  const { data: selectedBike } = useQuery({
    queryKey: ["bike", selectedBikeId],
    queryFn: () => getBikeById(),
    keepPreviousData: true,
    onError: (error:AxiosError) => {
      console.error(`Something went wrong with fetching the bikes: ${error}`);
    },
  });

  const onPageChange: PaginationProps["onChange"] = (page: number) => {
    setCurrentPage(page);
  };

  const onFilterTextChange = (text: string) => {
    setCurrentPage(1);
    setFilterText(text);
  };

  const onReadMoreToggle = (id:number | null) => {
    setSelectedBikeId(id)
  }

  if (isLoading) return <div>Loading..</div>;
  if (isError || data === undefined) return <div>Error</div>;

  return (
    <>
      <div className=" flex w-full justify-between gap-3 pb-6">
        <Input
          placeholder="Filter by text"
          suffix="🔍"
          className="w-1/3 p-2"
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
        <Tooltip title="Comming soon..">
          <RangePicker disabled />
        </Tooltip>
      </div>
      <List bikes={data} selectedBike={selectedBike} selectedBikeId={selectedBikeId} onReadMoreToggle={onReadMoreToggle} />
      <div className="flex w-full justify-center pt-6">
        {isCountLoading || isCountFetching ? (
          <p>Loading pagination..</p>
        ) : (
          <Pagination
            total={count?.proximity}
            showTotal={(total: number) => `Total ${total} items`}
            defaultPageSize={10}
            defaultCurrent={1}
            current={currentPage}
            onChange={onPageChange}
          />
        )}
      </div>
    </>
  );
};

export default Container;
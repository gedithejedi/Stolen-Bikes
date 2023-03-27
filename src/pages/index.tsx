import { type NextPage } from "next";
import {useState} from "react";
import { useQueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Bike from "../components/Bike/Bike";
import axios from "axios";

import type { GetBikeResponse, GetBikeCountResponse } from "types";
import { Button, Pagination, PaginationProps  } from "antd";

const BASE_URL = "https://bikeindex.org:443/api/v3/search";
const POSTS_PER_PAGE = 10;

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getBikes = async (page:number) => {
    const {data} = await axios.get<GetBikeResponse>(BASE_URL, {
      // The settings as needed
      params: {
        page: page,
        per_page: POSTS_PER_PAGE,
        location: "Munich",
        stolenness: "proximity",
      }
    });
    return data.bikes;
  }
  
  const getBikesCount = async () => {
    const {data} = await axios.get<GetBikeCountResponse>(BASE_URL+'/count', {
      params: {
        location: "Munich",
      }
    });
    return data;
  }

  // Query to get the bikes
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["bikes", currentPage],
    queryFn: () => getBikes(currentPage),
    keepPreviousData: true,
    // Check if there are more pages by fetching 1 more Bike
    onError: (error) =>{
      console.error(`Something went wrong with fetching the bikes: ${error}`);
    },
  });

  const { data: count, isLoading: isCountLoading, isError: isCountError } = useQuery({
    queryKey: ["bikeCount"],
    queryFn: getBikesCount,
    keepPreviousData: true,
    // Check if there are more pages by fetching 1 more Bike
    onError: (error) =>{
      console.error(`Something went wrong with fetching the count: ${error}`);
    },
  });

  const onPageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  }

  if (isLoading) return <div>Loading..</div>;
  if (isError || data === undefined) return <div>Error</div>;

  return (
    <>
      <h1 className="text-center uppercase">Bike Thefts in Munich</h1>
      <div className="flex flex-col">
        {data.map(bike => (
          <Bike key={bike.id} bike={bike}/>
        ))}
      </div>
      <div className="w-full flex justify-center">
        {isCountLoading ? 
          <p>Loading..</p>
          : (<Pagination
              total={count?.proximity}
              showTotal={(total) => `Total ${total} items`}
              defaultPageSize={10}
              defaultCurrent={1}
              current={currentPage}
              onChange={onPageChange}
            />)
        }
      </div>
    </>
  );
};

export default Home;
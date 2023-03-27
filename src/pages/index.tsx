import { type NextPage } from "next";
import {useState} from "react";
import { useQuery } from "@tanstack/react-query";
import Bike from "../components/Bike/Bike";
import axios from "axios";
import { unixToDate } from "~/helper";
import type { GetBikeResponse, GetBikeCountResponse, GetBikeDataResponse } from "types";
import { Pagination, PaginationProps, Modal} from "antd";
import { Empty } from 'antd';

const BASE_URL = "https://bikeindex.org:443/api/v3";
const POSTS_PER_PAGE = 10;
const LOCATION = "Munich";
//const LOCATION = "North Pole"; // Case for no results

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBikeId, setSelectedBikeId] = useState<number | null>(null)

  const getAllBikes = async (page:number) => {
    const {data} = await axios.get<GetBikeResponse>(BASE_URL+'/search', {
      // The settings as needed
      params: {
        page: page,
        per_page: POSTS_PER_PAGE,
        location: LOCATION,
        stolenness: "proximity",
      }
    });
    return data.bikes;
  }
  
  const getBikesCount = async () => {
    const {data} = await axios.get<GetBikeCountResponse>(BASE_URL+'/search/count', {
      params: {
        location: LOCATION,
      }
    });
    return data;
  }

  const getBikeById  = async () => {
    if(selectedBikeId == null) return null;
    const {data} = await axios.get<GetBikeDataResponse>(BASE_URL+'/bikes/'+selectedBikeId);
    return data.bike;
  }

  // Query to get the bikes
  const { data, isError, isLoading } = useQuery({
    queryKey: ["bikes", currentPage],
    queryFn: () => getAllBikes(currentPage),
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

  const { data: selectedBike, isError:isBikeError, isLoading: isBikeLoading } = useQuery({
    queryKey: ["bike", selectedBikeId],
    queryFn: () => getBikeById(),
    keepPreviousData: true,
    onError: (error) =>{
      console.error(`Something went wrong with fetching the bikes: ${error}`);
    },
  });

  console.log(selectedBike);

  const onPageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  }

  if (isLoading) return <div>Loading..</div>;
  if (isError || data === undefined) return <div>Error</div>;

  return (
    <>
      <h1 className="text-center uppercase">Bike Thefts in Munich</h1>
      <div className="flex flex-col">
        {data.length > 0 ? data.map(bike => (
            <Bike key={bike.id} bike={bike} setSelectedBikeId={setSelectedBikeId}/>
          ))
          : <Empty className="p-8"/>}
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
            />)}
      </div>
      <Modal 
        title="Extra Bike Information"
        open={selectedBikeId !== null}
        footer={null}
        onCancel={()=> setSelectedBikeId(null)}
      >
        <p>
          <span className="font-bold">Registration created at: </span>
          {selectedBike?.registration_created_at ? unixToDate(selectedBike.registration_created_at) : "N/A"}
        </p>
        <p>
          <span className="font-bold">Registration updated at: </span>
          {selectedBike?.registration_updated_at ? unixToDate(selectedBike.registration_updated_at) : "N/A"}
        </p>
      </Modal>
    </>
  );
};

export default Home;
import { type NextPage } from "next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Bike from "../components/Bike/Bike";
import axios from "axios";

import type { GetBikeResponse } from "types";

const BASE_URL = "https://bikeindex.org:443/api/v3/search";

const Home: NextPage = () => {
  // Query to get the bikes
  const { data, isError, isLoading } = useQuery({
    queryKey: ["bikes"],
    queryFn: async () => {
      const { data } = await axios.get<GetBikeResponse>(BASE_URL, {
        // The settings as needed
        params: {
          page: 1,
          per_page: 10,
          location: "Munich",
          stolenness: "proximity",
        }
      });
  
      if(data.bikes === undefined){
        throw new Error("Something went wrong, the bike data could not be fetched");
      }
  
      return data.bikes;
    },
    onError: (error) =>{
      console.error(`Something went wrong: ${error}`);
    },
  });

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>Error</div>;

  console.log(data);

  return (
    <>
      <h1 className="text-center">Bike Thefts in Munich</h1>
      <div className="flex flex-col">
        {data.map(bike => (
          <Bike key={bike.id} bike={bike}/>
        ))}
      </div>
    </>
  );
};

export default Home;
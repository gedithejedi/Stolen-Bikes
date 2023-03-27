import { type NextPage } from "next";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import BikeContainer from "../components/Bike/Container";

const Home: NextPage = () => {
  const queryClient = useQueryClient();

  return (
    <>
      <BikeContainer/>
    </>
  );
};

export default Home;

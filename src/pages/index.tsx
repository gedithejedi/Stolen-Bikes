import { type NextPage } from "next";
import Head from "next/head";

import BikeContainer from "../components/Bike/Container";

const Home: NextPage = () => {
  return (
    <>
      {/* <Head>
        <title>Bike Theft Tracker</title>
        <meta
          name="description"
          content="Track all reported bike thefts in the Munich area"
        />
        <link rel="icon" href="/polizei-muenchen-logo.svg" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className=" text-3xl">Track a Bike</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          </div>
        </div>
      </main> */}
      <BikeContainer />
    </>
  );
};

export default Home;

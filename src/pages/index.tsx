import { type NextPage } from "next";
import Head from "next/head";
import BikeContainer from "~/components/Bike/Container";
import PrimaryLayout from "~/components/Layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from './page';


const Home: NextPageWithLayout = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className=" text-3xl">Track a Bike</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <BikeContainer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

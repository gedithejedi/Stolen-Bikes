import { type NextPage } from "next";
import Image from 'next/image';
import Container from "~/components/Bike/Container";

const Home: NextPage = () => {

  return (
    <>
      <div className="flex flex-col justify-center items-center pb-16">
        <Image src="/img/polizei-muenchen-logo.svg" alt="Munich police logo" height={300} width={300} />
        <h1 className="text-center uppercase">Bike Thefts in Munich</h1>
      </div>
      <Container />
    </>
  );
};

export default Home;
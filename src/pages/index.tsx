import { type NextPage } from "next";
import Image from "next/image";
import Container from "~/components/Bike/Container";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pb-16">
        <Image
          src="/img/polizei-muenchen-logo.svg"
          alt="Munich police logo"
          height={220}
          width={220}
        />
        <h1 className="text-center uppercase">Bike Thefts in Munich</h1>
      </div>
      <Container />
    </>
  );
};

export default Home;

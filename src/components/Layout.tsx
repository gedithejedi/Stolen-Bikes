import Head from "next/head";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{"Bike Theft Tracker"}</title>
        <meta
          name="description"
          content="Track all reported bike thefts in the Munich area"
        />
        <link rel="icon" href="/polizei-muenchen-logo.svg" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          {children}
        </div>
      </main>
    </>
  );
};

export default PrimaryLayout;

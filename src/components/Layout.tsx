import Head from "next/head";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Polizei München - Bike Theft Tracker</title>
        <meta
          name="description"
          content="Track all reported bike thefts in the Munich area"
        />
        <link rel="icon" href="/img/polizei-muenchen-logo.svg" />
      </Head>
      <main className="flex min-h-screen flex-col bg-bgGray py-16">
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default PrimaryLayout;

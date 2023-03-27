import Head from 'next/head';

export interface IPrimaryLayout {
  children: JSX.Element
  title?: string
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children, 
  title 
}) => {
  return (
    <>

      <Head>
        <title>{title ?? "Bike Theft Tracker"}</title>
        <meta
          name="description"
          content="Track all reported bike thefts in the Munich area"
        />
        <link rel="icon" href="/polizei-muenchen-logo.svg" />
      </Head>
      <main className="">{children}</main>
    </>
  );
};

export default PrimaryLayout;
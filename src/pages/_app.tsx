import { type AppType } from "next/dist/shared/lib/utils";
import PrimaryLayout from "~/components/layouts/primary/PrimaryLayout";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PrimaryLayout>
      <Component {...pageProps} />
    </PrimaryLayout>
  );
};

export default MyApp;

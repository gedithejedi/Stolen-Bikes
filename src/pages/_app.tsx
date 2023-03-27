import { type AppType } from "next/dist/shared/lib/utils";
import PrimaryLayout from "~/components/layouts/primary/PrimaryLayout";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimaryLayout>
        <Component {...pageProps} />
      </PrimaryLayout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;

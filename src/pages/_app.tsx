import type { AppProps } from "next/app";

import { Toaster } from "sonner";

import { AuthProvider } from "@/lib/AuthContext";
import { NextPageWithLayout } from "@/components/types";
import { FactProvider } from "@/lib/FactContext";

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <FactProvider>
        <Toaster expand position="top-right" richColors pauseWhenPageIsHidden />
        {getLayout(<Component {...pageProps} />)}
      </FactProvider>
    </AuthProvider>
  );
}

export default MyApp;

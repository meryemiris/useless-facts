import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

import { Toaster } from "sonner";

import { AuthProvider } from "@/lib/AuthContext";
import { NextPageWithLayout } from "@/components/types";

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <Toaster expand position="top-right" richColors pauseWhenPageIsHidden />
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}

export default MyApp;

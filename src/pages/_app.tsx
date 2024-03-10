import type { AppProps } from "next/app";

import { AuthProvider } from "@/lib/AuthContext";
import { FactProvider } from "@/lib/FactContext";

import { Toaster } from "sonner";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FactProvider>
        <Toaster expand position="top-right" richColors pauseWhenPageIsHidden />
        <Component {...pageProps} />
      </FactProvider>
    </AuthProvider>
  );
}

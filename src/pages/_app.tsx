import type { AppProps } from "next/app";

import { AuthProvider } from "@/lib/AuthContext";
import { FactProvider } from "@/lib/FactContext";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FactProvider>
        <Component {...pageProps} />
      </FactProvider>
    </AuthProvider>
  );
}

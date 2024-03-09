import AuthContext from "@/lib/AuthContext";
import { FactProvider } from "@/lib/FactContext";
import { supabase } from "@/lib/supabase";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Fact } from ".";

export default function App({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setUserId(session?.user?.id || "");
    });

    return data.subscription.unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, isLoggedIn, setIsLoggedIn }}
    >
      <FactProvider>
        <Component {...pageProps} />
      </FactProvider>
    </AuthContext.Provider>
  );
}

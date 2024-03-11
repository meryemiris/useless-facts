import React, { createContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

export type AuthContextType = {
  userId: string;
  setUserId: (userId: string) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setUserId(session?.user?.id || "");
    });

    return data.subscription.unsubscribe;
  }, []);

  const value = { userId, setUserId, isLoggedIn, setIsLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
}

import { useEffect } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import { useAuthContext } from "@/lib/AuthContext";

import Layout from "@/components/layout/Layout";
import SavedFacts from "@/components/fact/SavedFacts";

export default function SavedFactsPage() {
  const { isLoggedIn } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    isLoggedIn ? false : router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>Saved Facts</title>
        <meta name="description" content="Saved Facts Page" />
      </Head>
      {isLoggedIn && (
        <Layout>
          <SavedFacts />
        </Layout>
      )}
    </>
  );
}

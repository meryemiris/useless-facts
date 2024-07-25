import Head from "next/head";

import RandomFact from "../components/fact/RandomFact";
import Layout from "../components/layout/Layout";
import TodayFact from "../components/fact/TodayFact";
import Loading from "@/components/utils/Loading";
import { useAuthContext } from "@/lib/AuthContext";

export default function HomePage() {
  const { userId } = useAuthContext();

  return (
    <>
      <Head>
        <title>Useless Facts</title>
        <meta name="description" content="Random Fact Viewer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {userId ? (
        <Layout>
          <TodayFact />
          <RandomFact />
        </Layout>
      ) : (
        <Loading size="md" color="orange" />
      )}
    </>
  );
}

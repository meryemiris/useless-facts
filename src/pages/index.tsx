import Head from "next/head";

import RandomFact from "../components/fact/RandomFact";
import Layout from "../components/layout/Layout";
import TodayFact from "../components/fact/TodayFact";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Useless Facts</title>
        <meta name="description" content="Random Fact Viewer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <TodayFact />
        <RandomFact />
      </Layout>
    </>
  );
}

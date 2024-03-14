import Head from "next/head";

import RandomFact from "../components/fact/RandomFact";
import Layout from "../components/layout/Layout";
import TodayFact from "../components/fact/TodayFact";

export type Fact = {
  id: string;
  text: string;
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Teklifim Gelsin Task</title>
        <meta name="description" content="Random Fact Viewer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <TodayFact />
        <RandomFact />
      </Layout>
    </>
  );
}

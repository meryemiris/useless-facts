import Head from "next/head";

import SavedFacts from "@/components/fact/saved/SavedFacts";
import Layout from "@/components/layout/Layout";

export default function SavedFactsPage() {
  return (
    <>
      <Head>
        <title>Saved Facts</title>
        <meta name="description" content="Saved Facts Page" />
      </Head>

      <Layout>
        <SavedFacts />
      </Layout>
    </>
  );
}

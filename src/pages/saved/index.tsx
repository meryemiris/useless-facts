import Head from "next/head";

import Layout from "@/components/layout/Layout";
import SavedFacts from "@/components/fact/SavedFacts";

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

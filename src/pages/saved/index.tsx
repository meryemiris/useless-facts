import Layout from "@/components/Layout";
import SavedFacts from "@/components/SavedFacts";
import Head from "next/head";

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

import Layout from "@/components/Layout";
import SavedFacts from "@/components/SavedFacts";
import AuthContext from "@/lib/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function SavedFactsPage() {
	const { isLoggedIn } = useContext(AuthContext);

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

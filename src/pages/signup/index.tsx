import Signup from "@/components/auth/Signup";
import Head from "next/head";

export default function SignupPage() {
	return (
		<>
			<Head>
				<title>Signup</title>
				<meta name="description" content="Signup Page" />
			</Head>
			<Signup />
		</>
	);
}

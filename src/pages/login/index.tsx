import Login from "@/components/auth/Login";
import Head from "next/head";

export default function LoginPage() {
	return (
		<>
			<Head>
				<title>Login</title>
				<meta name="description" content="Login to your account" />
			</Head>

			<Login />
		</>
	);
}

// pages/signup.tsx
import { ReactElement } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { NextPageWithLayout } from "@/components/types";
import AuthForm from "@/components/auth/AuthForm";
import Head from "next/head";

const LoginPage: NextPageWithLayout = () => {
  return <AuthForm action="login" />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Login to your account</title>
        <meta name="description" content="Login to your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthLayout header="Welcome!" subheader="Ready to Start?">
        {page}
      </AuthLayout>
    </>
  );
};

export default LoginPage;

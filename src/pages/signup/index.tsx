import { ReactElement } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { NextPageWithLayout } from "@/components/types";
import AuthForm from "@/components/auth/AuthForm";
import Head from "next/head";

const SignupPage: NextPageWithLayout = () => {
  return <AuthForm action="signup" />;
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Create your account</title>
        <meta name="description" content="Create your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>{" "}
      <AuthLayout header="Start Now!" subheader="Join for free.">
        {page}
      </AuthLayout>
    </>
  );
};

export default SignupPage;

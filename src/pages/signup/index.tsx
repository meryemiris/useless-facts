import { ReactElement } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { NextPageWithLayout } from "@/components/types";
import AuthForm from "@/components/auth/AuthForm";

const SignupPage: NextPageWithLayout = () => {
  return <AuthForm action="signup" />;
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout header="Start Now!" subheader="Join for free.">
      {page}
    </AuthLayout>
  );
};

export default SignupPage;

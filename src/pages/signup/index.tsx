import { ReactElement } from "react";
import Signup from "@/components/auth/Signup";
import AuthLayout from "@/components/layout/AuthLayout";
import { NextPageWithLayout } from "@/components/types";

const SignupPage: NextPageWithLayout = () => {
  return <Signup />;
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout header="Start Now!" subheader="Join for free.">
      {page}
    </AuthLayout>
  );
};

export default SignupPage;

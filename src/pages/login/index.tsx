// pages/signup.tsx
import { ReactElement } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { NextPageWithLayout } from "@/components/types";
import AuthForm from "@/components/auth/AuthForm";

const LoginPage: NextPageWithLayout = () => {
  return <AuthForm action="login" />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout header="Welcome!" subheader="Ready to Start?">
      {page}
    </AuthLayout>
  );
};

export default LoginPage;

// pages/signup.tsx
import { ReactElement } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { NextPageWithLayout } from "@/components/types";
import Login from "@/components/auth/Login";

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout header="Welcome!" subheader="Ready to Start?">
      {page}
    </AuthLayout>
  );
};

export default LoginPage;

import React, { memo } from "react";
import { RouteComponentProps } from "react-router-dom";

import Layout from "../Layout";

import useLoginViewState from "./useLoginViewState";
import LoginViewForm from "./LoginViewForm";

function LoginView({ history }: RouteComponentProps) {
  const { handleSubmit } = useLoginViewState(history);
  return (
    <Layout>
        <LoginViewForm handleSubmit={handleSubmit} />
    </Layout>
  );
}

export default memo(LoginView);

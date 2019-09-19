import React, { memo } from "react";
import { RouteComponentProps } from "react-router-dom";

import Layout from "../Layout";

import useRegisterViewState from "./useRegisterViewState";
import RegisterViewForm from "./RegisterViewForm";

function RegisterView({ history }: RouteComponentProps) {
  const { handleSubmit } = useRegisterViewState(history);
  return (
    <Layout>
        <RegisterViewForm handleSubmit={handleSubmit} />
    </Layout>
  );
}

export default memo(RegisterView);

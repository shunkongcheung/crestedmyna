import React, { memo } from "react";
import { RouteComponentProps } from "react-router-dom";

import Layout from "../Layout";
import { CenterArea } from "../Utils";

import useRegisterViewState from "./useRegisterViewState";
import RegisterViewForm from "./RegisterViewForm";

function RegisterView({ history }: RouteComponentProps) {
  const { handleSubmit } = useRegisterViewState(history);
  return (
    <Layout>
      <CenterArea>
        <RegisterViewForm handleSubmit={handleSubmit} />
      </CenterArea>
    </Layout>
  );
}

export default memo(RegisterView);

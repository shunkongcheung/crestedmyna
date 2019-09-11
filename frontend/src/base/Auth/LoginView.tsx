import React, { memo } from "react";
import {RouteComponentProps} from "react-router-dom"

import Layout from "../Layout/Layout";
import CenterArea from "../Utils/CenterArea";

import useLoginViewState from "./useLoginViewState";
import LoginViewForm from "./LoginViewForm";

function LoginView({history}:RouteComponentProps) {
  const { handleSubmit } = useLoginViewState(history);
  return (
    <Layout>
      <CenterArea>
        <LoginViewForm handleSubmit={handleSubmit} />
      </CenterArea>
    </Layout>
  );
}

export default memo(LoginView);

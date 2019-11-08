import React, { memo, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";

import Layout from "../Layout";
import { FormArea } from "../Form";
import InputText from "../Form/InputText2";

import useLoginViewState from "./useLoginViewState";

interface ILoginVal {
  username: string;
  password: string;
}

function LoginView({ history }: RouteComponentProps) {
  const { handleSubmit, validationSchema } = useLoginViewState(history);

  const renderForm = useCallback(
    formikProps => (
      <FormArea
        banner="LOGIN"
        handleSubmit={formikProps.handleSubmit}
        isSubmitting={formikProps.isSubmitting}
        submitText="LOGIN"
        withPadding
      >
        <div style={{ marginBottom: "1rem" }}>
          <InputText label="Username" name="username" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <InputText label="Password" name="password" isMask />
        </div>
      </FormArea>
    ),
    []
  );

  return (
    <Layout>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {renderForm}
      </Formik>
    </Layout>
  );
}

export default memo(LoginView);

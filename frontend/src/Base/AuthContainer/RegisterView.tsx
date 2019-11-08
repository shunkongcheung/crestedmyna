import React, { memo, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";

import Layout from "../Layout";
import { FormArea, InputText } from "../Form";

import useRegisterViewState from "./useRegisterViewState";

interface IRegisterVal {
  first_name: string;
  last_name?: string;
  email: string;
  username: string;
  password: string;
}

function RegisterView({ history }: RouteComponentProps) {
  const { handleSubmit, validationSchema } = useRegisterViewState(history);

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
          <InputText {...formikProps} label="First name" name="first_name" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <InputText {...formikProps} label="Last name" name="last_name" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <InputText {...formikProps} label="Email" name="email" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <InputText {...formikProps} label="Username" name="username" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <InputText {...formikProps} label="Password" name="password" isMask />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <InputText
            {...formikProps}
            label="Password (again)"
            name="password_again"
            isMask
          />
        </div>
      </FormArea>
    ),
    []
  );

  return (
    <Layout>
      <Formik
        initialValues={{
          first_name: "",
          email: "",
          username: "",
          password: "",
          password_again: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {renderForm}
      </Formik>
    </Layout>
  );
}

export default memo(RegisterView);

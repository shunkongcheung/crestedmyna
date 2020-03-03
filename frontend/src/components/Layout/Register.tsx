import React, { memo, useCallback, useMemo } from "react";
import { Button } from "antd";
import { Formik } from "formik";
import { useFetchEdit } from "react-accessories";
import styled from "styled-components";
import * as yup from "yup";

import InputText from "../InputText";
import FormSubmitBtn from "../FormSubmitBtn";

interface RegisterProps {
  handleTokenChange: (token: string) => any;
  handleLogin: () => any;
}

const Form = styled.form`
  margin-top: 24px;
`;

function Register({ handleTokenChange, handleLogin }: RegisterProps) {
  const fetchEdit = useFetchEdit<{ token: string }>();

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string(),
        email: yup
          .string()
          .email()
          .required(),
        password: yup.string().required(),
        passwordAgain: yup
          .string()
          .required()
          .oneOf([yup.ref("password"), null], "Passwords must match")
      }),
    []
  );

  const handleSubmit = useCallback(
    async data => {
      const reg = await fetchEdit("/auth/register", {
        data,
        isAuthenticated: false
      });
      if (!reg) return;
      const login = await fetchEdit("/auth/login", {
        data,
        isAuthenticated: false
      });
      if (!login) return;
      const { token } = login;
      handleTokenChange(token);
    },
    [fetchEdit, handleTokenChange]
  );

  return (
    <Formik
      initialValues={{
        first_name: "",
        email: "",
        username: "",
        password: "",
        passwordAgain: ""
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="First name" name="firstName" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="Last name" name="lastName" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="Email" name="email" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="Username" name="username" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="Password" name="password" isMask />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="Password (again)" name="passwordAgain" isMask />
          </div>
          <FormSubmitBtn>Register</FormSubmitBtn>
          <Button type="link" onClick={handleLogin}>
            Go back to login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default memo(Register);

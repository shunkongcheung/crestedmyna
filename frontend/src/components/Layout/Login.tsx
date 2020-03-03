import React, { memo, useCallback } from "react";
import { useFetchEdit } from "react-accessories";
import { Button } from "antd";
import { Formik } from "formik";
import styled from "styled-components";
import * as yup from "yup";

import InputText from "../InputText";
import FormSubmitBtn from "../FormSubmitBtn";

const Form = styled.form`
  margin-top: 24px;
`;

interface LoginProps {
  handleTokenChange: (token: string) => any;
  handleRegister: () => any;
}

function Login(props: LoginProps) {
  const { handleTokenChange, handleRegister } = props;
  const fetchEdit = useFetchEdit<{ token: string }>();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  });

  const handleSubmit = useCallback(
    async (data: object) => {
      const res = await fetchEdit("/auth/login", {
        data,
        isAuthenticated: false
      });
      if (!res) return;
      const { token } = res;
      handleTokenChange(token);
    },
    [fetchEdit, handleTokenChange]
  );

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="Username" name="username" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <InputText label="Password" name="password" isMask />
          </div>
          <FormSubmitBtn>Login</FormSubmitBtn>
          <Button type="link" onClick={handleRegister}>
            Don't have an account?
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default memo(Login);

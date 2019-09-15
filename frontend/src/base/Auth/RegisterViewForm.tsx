import React, { memo } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { FormArea, InputText } from "../FormInputs";

interface IRegisterVal {
  first_name: string;
  last_name?: string;
  email: string;
  username: string;
  password: string;
}

interface IRegisterViewFormProps {}

interface IFormikProps extends IRegisterViewFormProps {
  handleSubmit: (v: IRegisterVal, f: any) => Promise<any>;
}

function RegisterViewForm(
  formikProps: IRegisterViewFormProps & FormikProps<IRegisterVal>
) {
  return (
    <FormArea
      banner="REGISTER"
      handleSubmit={formikProps.handleSubmit}
      isSubmitting={formikProps.isSubmitting}
      submitText="REGISTER"
    >
      <InputText {...formikProps} label="First name" name="first_name" />
      <InputText {...formikProps} label="Last name" name="last_name" />
      <InputText {...formikProps} label="Email" name="email" />
      <InputText {...formikProps} label="Username" name="username" />
      <InputText {...formikProps} label="Password" name="password" isMask />
      <InputText
        {...formikProps}
        label="Password (again)"
        name="password_again"
        isMask
      />
    </FormArea>
  );
}

RegisterViewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
export default withFormik<IFormikProps, IRegisterVal>({
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    first_name: Yup.string().required(),
    last_name: Yup.string(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
    password_again: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
  }),
  handleSubmit: async (values, { props: { handleSubmit }, ...formApis }) => {
    const submitValues = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      username: values.username,
      password: values.password
    };
    await handleSubmit(submitValues, formApis);
    formApis.setSubmitting(false);
  }
})(memo(RegisterViewForm));

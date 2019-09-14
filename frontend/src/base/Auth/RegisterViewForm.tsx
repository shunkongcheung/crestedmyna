import React, { memo } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { InputeText } from "../FormInputs";
import Button from "../Utils/Button";

import classes from "./LoginViewForm.module.scss";

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
    <form className={classes.container} onSubmit={formikProps.handleSubmit}>
      <div className={classes.content}>
        <h1 className={classes.banner}>REGISTER</h1>
        <InputeText {...formikProps} label="First name" name="first_name" />
        <InputeText {...formikProps} label="Last name" name="last_name" />
        <InputeText {...formikProps} label="Email" name="email" />
        <InputeText {...formikProps} label="Username" name="username" />
        <InputeText {...formikProps} label="Password" name="password" isMask />
        <InputeText
          {...formikProps}
          label="Password (again)"
          name="password_again"
          isMask
        />
        <div className={classes.submitBtnDiv}>
          <Button
            handleClick={formikProps.handleSubmit}
            label="Register"
            isSubmitting={formikProps.isSubmitting}
            varient="primary"
          />
        </div>
      </div>
    </form>
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

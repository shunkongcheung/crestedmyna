import React, { memo, useContext, useEffect, useMemo } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import InputeText from "../FormInputs/InputText";
import Button from "../Utils/Button";

import classes from "./LoginViewForm.module.scss";

interface ILoginVal {
  username: string;
  password: string;
}

interface ILoginViewFormProps {}

interface IFormikProps extends ILoginViewFormProps {
  handleSubmit: (
    v: { username: string; password: string },
    f: any
  ) => Promise<any>;
}

function LoginViewForm(
  formikProps: ILoginViewFormProps & FormikProps<ILoginVal>
) {
  return (
    <form className={classes.container} onSubmit={formikProps.handleSubmit}>
      <div className={classes.content}>
        <h1 className={classes.banner}>LOGIN</h1>
        <InputeText {...formikProps} label="Username" name="username" />
        <InputeText {...formikProps} label="Password" name="password" isMask />
        <div className={classes.submitBtnDiv}>
          <Button
            handleClick={formikProps.handleSubmit}
            label="Submit"
            isSubmitting={formikProps.isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}

LoginViewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
export default withFormik<IFormikProps, ILoginVal>({
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit: async (values, { props: { handleSubmit }, ...formApis }) => {
    const submitValues = {
      username: values.username,
      password: values.password
    };
    await handleSubmit(submitValues, formApis);
    formApis.setSubmitting(false);
  }
})(memo(LoginViewForm));

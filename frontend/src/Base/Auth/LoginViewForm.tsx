import React, { memo } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { FormArea, InputText } from "../Form";

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
    <FormArea
      banner="LOGIN"
      handleSubmit={formikProps.handleSubmit}
      isSubmitting={formikProps.isSubmitting}
      submitText="LOGIN"
      withPadding
    >
      <InputText {...formikProps} label="Username" name="username" />
      <InputText {...formikProps} label="Password" name="password" isMask />
    </FormArea>
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

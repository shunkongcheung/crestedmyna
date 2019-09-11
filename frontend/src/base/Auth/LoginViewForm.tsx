import React, { memo } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import InputeText from "../FormInputs/InputText";
import Button from "../Utils/Button";

interface ILoginVal {
  username: string;
  password: string;
}

interface ILoginViewFormProps {}

interface IFormikProps extends ILoginViewFormProps {
  handleSubmit: (v: { [x: string]: any }, f: any) => Promise<any>;
}

function LoginViewForm(
  formikProps: ILoginViewFormProps & FormikProps<ILoginVal>
) {
  console.log("here....", formikProps);
  return (
    <>
      <div>
        <InputeText {...formikProps} label="Username" name="username" />
      </div>
      <div>
        <InputeText {...formikProps} label="Password" name="password" isMask />
      </div>
      <div>
        <Button
          handleClick={formikProps.handleSubmit}
          label="Submit"
          isSubmitting={formikProps.isSubmitting}
        />
      </div>
    </>
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

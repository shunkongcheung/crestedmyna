import React, { memo, useEffect, useRef } from "react";
import { withFormik, FormikProps } from "formik";
import { Moment } from "moment";
import PropTypes from "prop-types";

import { InputDateTime } from "../../Base/Form";

interface IFormikVal {
  targetDate: Moment;
}
interface ITargetDateProps {
  handleTargetDateChange: (d: Moment) => any;
}

interface IFormikProps extends IFormikVal, ITargetDateProps {}

function TargetDate({
  handleTargetDateChange,
  ...formikProps
}: ITargetDateProps & FormikProps<IFormikVal>) {
  const { targetDate } = formikProps.values;
  const oldTargetDate = useRef(targetDate);

  useEffect(
    () => {
      if (oldTargetDate.current === targetDate) return;
      oldTargetDate.current = targetDate;
      handleTargetDateChange(targetDate);
    },
    [targetDate, handleTargetDateChange]
  );

  return (
    <InputDateTime
      {...formikProps}
      label="Target date"
      mode="date"
      name="targetDate"
    />
  );
}

TargetDate.propTypes = {
  handleTargetDateChange: PropTypes.func.isRequired
};
export default withFormik<IFormikProps, IFormikVal>({
  enableReinitialize: true,
  handleSubmit: () => {}
})(memo(TargetDate));

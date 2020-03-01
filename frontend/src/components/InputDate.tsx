import React, { memo, useCallback } from "react";

import { DatePicker } from "antd";
import { useField } from "formik";
import moment, { Moment } from "moment";

import InputContainer from "./InputContainer";

interface InputDateProps {
  disableDateB4Today?: boolean;
  name: string;
  label: string;
}

function InputDate({ disableDateB4Today = true, label, name }: InputDateProps) {
  const [{ value, onChange }, { error }] = useField({ name });
  const disabledDate = useCallback(
    (date: Moment | null) =>
      disableDateB4Today && !!date && date < moment().startOf("date"),
    [disableDateB4Today]
  );
  return (
    <InputContainer name={name} label={label}>
      <DatePicker
        showTime={{ format: "HH:00" }}
        format="YYYY-MM-DD HH:00"
        placeholder={label}
        disabledDate={disabledDate}
        onChange={(value: Moment | null) =>
          onChange({ target: { name, value } })
        }
        value={value ? moment(value) : undefined}
        style={
          error
            ? { border: "1px solid red", borderRadius: "0.3rem", width: "100%" }
            : { width: "100%" }
        }
      />
    </InputContainer>
  );
}

export default memo(InputDate);

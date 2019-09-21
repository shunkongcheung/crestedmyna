import React, { memo, useCallback, useMemo, useState } from "react";
import { FormikProps } from "formik";
import PropTypes from "prop-types";

import CreatableSelect from "react-select/creatable";

interface IInputSelectProps {
  choices: Array<{ name: string; id: number }>;
  name: string;
  onValueChange: (value: number | string) => any;
}

interface ISelectValue {
  label: string;
  value: number;
}

function InputSelect({
  choices,
  name,
  onValueChange,
  ...formikProps
}: IInputSelectProps & FormikProps<{ [x: string]: any }>) {
  const { setFieldTouched, setFieldValue } = formikProps;
  const [selectValue, setSelectValue] = useState<ISelectValue>({
    label: "",
    value: -1
  });

  const handleSelectChange = useCallback(
    (newValue: any, actionMeta: any) => {
      setSelectValue(newValue);
      const value = newValue ? newValue.value : "";
      setFieldValue(name, value);
      if (onValueChange) onValueChange(value);
    },
    [name, onValueChange, setFieldValue]
  );
  const handleSelectBlur = useCallback(
    () => setFieldTouched(name, true, true),
    [name, setFieldTouched]
  );

  const parsedChoices = useMemo(
    () => choices.map(itm => ({ label: itm.name, value: itm.id })),
    [choices]
  );

  return (
    <CreatableSelect
      isClearable
      onChange={handleSelectChange}
      name={name}
      onBlur={handleSelectBlur}
      options={parsedChoices}
      value={selectValue}
    />
  );
}

InputSelect.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func
};
export default memo(InputSelect);

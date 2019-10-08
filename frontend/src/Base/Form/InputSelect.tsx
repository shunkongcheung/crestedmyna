import React, { memo, useCallback, useMemo, useRef } from "react";
import { Select, Tooltip } from "antd";
import { FormikProps } from "formik";
import PropTypes from "prop-types";

import useFormInputsState from "./useFormInputsState";

const { Option } = Select;

interface IInputSelectProps {
  allowClear?: boolean;
  choices: Array<{ name: string; id: any }>;
  label?: string;
  multiple?: boolean;
  name: string;
  onSearch?: (value: number | string) => any;
}

interface ISelectValue {
  label: string;
  value: number;
}

function InputSelect({
  allowClear = true,
  choices,
  label,
  multiple = false,
  name,
  onSearch,
  ...formikProps
}: IInputSelectProps & FormikProps<{ [x: string]: any }>) {
  const { setFieldTouched, setFieldValue } = formikProps;
  const { inputValue, inputError, style } = useFormInputsState(
    name,
    formikProps
  );
  const searchValue = useRef<string>("");

  const handleSelectChange = useCallback(
    (newValue: any) => {
      setFieldValue(name, newValue);
      searchValue.current = "";
    },
    [name, setFieldValue]
  );
  const handleSelectBlur = useCallback(
    () => {
      setFieldTouched(name, true, true);
      if (searchValue.current && onSearch) {
        const tempValue = searchValue.current;
        searchValue.current = "";
        onSearch(tempValue);
      }
    },
    [name, onSearch, setFieldTouched]
  );
  const handleSearch = useCallback(
    (value: any) => {
      if (!onSearch) return;
      if (!value) return;
      searchValue.current = value;
    },
    [onSearch]
  );

  const filterOption = useCallback(
    (input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    []
  );

  const renderedChoices = useMemo(
    () =>
      choices.map((itm, key) => (
        <Option key={key} value={itm.id}>
          {itm.name}
        </Option>
      )),
    [choices]
  );

  const mode = useMemo(
    () => {
      if (multiple) return "multiple";
      return undefined;
    },
    [multiple]
  );

  return (
    <Tooltip title={inputError}>
      <Select
        allowClear={allowClear}
        filterOption={filterOption}
        mode={mode}
        onBlur={handleSelectBlur}
        onChange={handleSelectChange}
        onSearch={handleSearch}
        optionFilterProp="children"
        placeholder={label}
        showSearch
        style={{ ...style, width: "100%" }}
        value={inputValue}
      >
        {renderedChoices}
      </Select>
    </Tooltip>
  );
}

InputSelect.propTypes = {
  allowClear: PropTypes.bool,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
  ).isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func
};
export default memo(InputSelect);

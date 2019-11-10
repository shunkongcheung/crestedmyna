import React, { memo, useCallback, useMemo, useRef } from "react";
import { Select, Tooltip } from "antd";
import { useField } from "formik";
import PropTypes from "prop-types";

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
  onSearch,
  ...formikProps
}: IInputSelectProps) {
  const [field, meta] = useField(formikProps);
  const { onChange, onBlur, value } = field;
  const { touched, error } = meta;
  const { name } = formikProps;

  const searchValue = useRef<string>("");

  const handleSelectChange = useCallback(
    (value: any) => {
      onChange({ target: { name, value } });
      searchValue.current = "";
    },
    [name, onChange]
  );

  const handleSelectBlur = useCallback(
    () => {
      onBlur({ target: { name } });
      if (searchValue.current && onSearch) {
        const tempValue = searchValue.current;
        searchValue.current = "";
        onSearch(tempValue);
      }
    },
    [name, onBlur, onSearch]
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
  const style = useMemo(
    () => {
      if (!error || !touched) return undefined;
      return {
        border: "1px solid red",
        borderRadius: 5
      };
    },
    [error, touched]
  );

  return (
    <Tooltip title={error}>
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
        value={value}
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

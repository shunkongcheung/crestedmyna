import React, { memo, useEffect, useRef } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";

import  InputSelect  from "../../../Base/Form/InputSelect2";

interface ISearchFieldProps {
  stockMasters: Array<{ name: string; id: number }>;
  handleStockMasterChange: (id: number) => any;
  handleStockSearch: (search: string) => any;
}
interface IFormikProps extends ISearchFieldProps {}

interface IFormikVal {
  searchName: string | number;
}

function SearchField({
  stockMasters,
  handleStockMasterChange,
  handleStockSearch,
  ...formikProps
}: ISearchFieldProps & FormikProps<IFormikVal>) {
  const oldName = useRef<undefined | number>();
  const { values } = formikProps;
  const { searchName } = values;

  useEffect(
    () => {
      if (searchName === undefined) return;
      if (oldName.current === searchName) return;
      oldName.current = searchName as number;
      handleStockMasterChange(searchName as number);
    },
    [searchName, handleStockMasterChange]
  );

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <InputSelect
        choices={stockMasters}
        name="searchName"
        onSearch={handleStockSearch as any}
      />
    </div>
  );
}

SearchField.propTypes = {
  handleStockMasterChange: PropTypes.func.isRequired,
  handleStockSearch: PropTypes.func.isRequired
};
export default withFormik<IFormikProps, IFormikVal>({
  handleSubmit: () => {}
})(memo(SearchField));

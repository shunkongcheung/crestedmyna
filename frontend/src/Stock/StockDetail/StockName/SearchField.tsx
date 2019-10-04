import React, { memo, useCallback } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";

import { InputSelect } from "../../../Base/Form";

interface ISearchFieldProps {
  stockMasters: Array<{ name: string; id: number }>;
  handleStockMasterChange: (id: number) => any;
  handleStockSearch: (search: string) => any;
}
interface IFormikProps extends ISearchFieldProps {}

interface IFormikVal {
  searchName: string;
}

function SearchField({
  stockMasters,
  handleStockMasterChange,
  handleStockSearch,
  ...formikProps
}: ISearchFieldProps & FormikProps<IFormikVal>) {
  const onValueChange = useCallback(
    async value => {
      if (!value) return;
      const existing = stockMasters.find(itm => itm.id === value);
      if (existing) handleStockMasterChange(value);
      if (typeof value === "string") handleStockSearch(value);
    },
    [handleStockMasterChange, handleStockSearch, stockMasters]
  );
  return (
    <div style={{ marginTop: "0.5rem" }}>
      <InputSelect
        choices={stockMasters}
        name="searchName"
        onValueChange={onValueChange}
        {...formikProps}
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

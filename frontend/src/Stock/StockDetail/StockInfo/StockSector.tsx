import React, { memo, useEffect, useRef } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";

import { InputSelect } from "../../../Base/Form";

interface IFormikVal {
  sector: number;
}
interface IStockSectorProps extends IFormikVal {
  sectors: Array<{ name: string; id: number }>;
  handleStockSectorChange: (s: number) => any;
}

interface IFormikProps extends IStockSectorProps {}

function StockSector({
  handleStockSectorChange,
  sectors,
  ...formikProps
}: IStockSectorProps & FormikProps<IFormikVal>) {
  const prevSector = useRef<undefined | number>();
  const { sector } = formikProps.values;

  useEffect(
    () => {
      if (!prevSector.current && sector > 0) {
        prevSector.current = sector;
        return;
      }
      if (prevSector.current !== sector) handleStockSectorChange(sector);
      prevSector.current = sector;
    },
    [sector, handleStockSectorChange]
  );

	return <InputSelect allowClear={false}
	name="sector" choices={sectors} {...formikProps} />;
}

StockSector.propTypes = {
  handleStockSectorChange: PropTypes.func.isRequired,
  sector: PropTypes.number.isRequired
};
export default withFormik<IFormikProps, IFormikVal>({
  handleSubmit: () => {}
})(memo(StockSector));

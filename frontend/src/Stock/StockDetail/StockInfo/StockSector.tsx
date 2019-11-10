import React, { memo, useEffect, useRef } from "react";
import { Spin } from "antd";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";

import InputSelect from "../../../Base/Form/InputSelect2";

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
      if (sector <= 0) return;
      if (!prevSector.current) {
        prevSector.current = sector;
        return;
      }
      if (prevSector.current !== sector) handleStockSectorChange(sector);
      prevSector.current = sector;
    },
    [sector, handleStockSectorChange]
  );
  if (!(sector > 0)) return <Spin />;

  return <InputSelect allowClear={false} name="sector" choices={sectors} />;
}

StockSector.propTypes = {
  handleStockSectorChange: PropTypes.func.isRequired,
  sector: PropTypes.number.isRequired
};
export default withFormik<IFormikProps, IFormikVal>({
  enableReinitialize: true,
  handleSubmit: () => {}
})(memo(StockSector));

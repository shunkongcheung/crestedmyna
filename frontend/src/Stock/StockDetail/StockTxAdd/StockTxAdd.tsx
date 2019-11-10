import React, { memo, useCallback, useMemo } from "react";
import { Button } from "antd";
import { Formik } from "formik";
import PropTypes from "prop-types";

import { InputDateTime, InputText } from "../../../Base/Form";
import InputSelect from "../../../Base/Form/InputSelect2";

import useStockTxAdd from "./useStockTxAdd";
import classNames from "./StockTxAdd.module.scss";

interface IStockTx {
  txType: "BUY" | "SELL" | "DIVIDEND";
  shareCount: number;
  price: number;
  txAt: Date;
}
interface IStockTxAddProps {
  handleAddTx: (st: IStockTx, f: any) => any;
}

function StockTxAdd({ handleAddTx }: IStockTxAddProps) {
  const { handleSubmit, validationSchmea } = useStockTxAdd(handleAddTx);

  const renderedTxType = useMemo(() => {
    const choices = [
      { name: "BUY", id: "BUY" },
      { name: "SELL", id: "SELL" },
      { name: "DIVIDEND", id: "DIVIDEND" }
    ];
    return (
      <InputSelect choices={choices} label="Transaction type" name="txType" />
    );
  }, []);

  const initialValues = useMemo<IStockTx>(
    () => ({
      txType: "BUY",
      shareCount: 0,
      price: 0,
      txAt: new Date()
    }),
    []
  );

  return (
    <Formik
      validationSchmea={validationSchmea}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {formikProps => (
        <div className={classNames.container}>
          <div className={classNames.addCol} style={{ marginLeft: 0 }}>
            {renderedTxType}
          </div>
          <div className={classNames.addCol}>
            <InputText label="Share" name="shareCount" />
          </div>
          <div className={classNames.addCol}>
            <InputText label="Price" name="price" />
          </div>
          <div className={classNames.addCol}>
            <InputDateTime label="Date" name="txAt" mode="date" />
          </div>
          <div className={classNames.iconContainer}>
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              onClick={formikProps.handleSubmit as any}
            />
          </div>
        </div>
      )}
    </Formik>
  );
}

StockTxAdd.propTypes = {
  handleAddTx: PropTypes.func.isRequired
};
export default memo(StockTxAdd);

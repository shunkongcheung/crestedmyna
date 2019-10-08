import React, { memo } from "react";
import { Button } from "antd";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { InputSelect, InputText, InputDateTime } from "../../../Base/Form";

import classNames from "./StockTxAdd.module.scss";

interface IStockTx {
  txType: "BUY" | "SELL";
  shareCount: number;
  price: number;
  txAt: Date;
}
interface IStockTxAddProps {
  handleAddTx: (st: IStockTx, f: any) => any;
}

function StockTxAdd(formikProps: IStockTxAddProps & FormikProps<IStockTx>) {
  const { handleSubmit } = formikProps;
  return (
    <div className={classNames.container}>
      <div className={classNames.addCol} style={{ marginLeft: 0 }}>
        <InputSelect
          {...formikProps}
          choices={[{ name: "BUY", id: "BUY" }, { name: "SELL", id: "SELL" }]}
          label="Transaction type"
          name="txType"
        />
      </div>
      <div className={classNames.addCol}>
        <InputText {...formikProps} label="Share" name="shareCount" />
      </div>
      <div className={classNames.addCol}>
        <InputText {...formikProps} label="Price" name="price" />
      </div>
      <div className={classNames.addCol}>
        <InputDateTime {...formikProps} label="Date" name="txAt" mode="date" />
      </div>
      <div className={classNames.iconContainer}>
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          onClick={handleSubmit as any}
        />
      </div>
    </div>
  );
}

StockTxAdd.propTypes = {
  handleAddTx: PropTypes.func.isRequired
};
export default withFormik<IStockTxAddProps, IStockTx>({
  validationSchema: Yup.object().shape({
    txType: Yup.string()
      .oneOf(["BUY", "SELL"])
      .required(),
    txAt: Yup.date().required(),
    price: Yup.number()
      .min(0.00000001)
      .required(),
    shareCount: Yup.number()
      .min(0.00000001)
      .required()
  }),
  handleSubmit: async (values, { props: { handleAddTx }, ...formikProps }) => {
    const submitValues: IStockTx = {
      txType: values.txType,
      txAt: values.txAt,
      price: values.price,
      shareCount: values.shareCount
    };
    await handleAddTx(submitValues, formikProps);
    formikProps.setSubmitting(false);
  }
})(memo(StockTxAdd));

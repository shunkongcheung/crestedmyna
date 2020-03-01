import React, { memo, useCallback, useMemo } from "react";
import { Divider, Modal } from "antd";
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";

import { InputText } from "../../../Base/Form";

import PropTypes from "prop-types";

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
  dividendStaticCost: number;
  dividendProportionCost: number;
}

interface IStockProfileDialogProps {
  handleStockProfileChange: (p: IStockProfile, f: any) => any;
  handleModalClose: () => any;
  isModalOpen: boolean;
}

function StockProfileDialog({
  isModalOpen,
  handleModalClose,
  ...formikProps
}: IStockProfileDialogProps & FormikProps<IStockProfile>) {
  const { handleSubmit, values } = formikProps;
  const {
    dividendStaticCost,
    dividendProportionCost,
    txStaticCost,
    txProportionCost
  } = values;

  const renderContent = useCallback((staticCost, proportionCost, type) => {
    return `Your ${type} transaction cost will be calculated as: ${staticCost ||
      0} + ${proportionCost} * Gross value`;
  }, []);

  const renderedTxContent = useMemo(
    () => renderContent(txStaticCost, txProportionCost, "trade"),
    [renderContent, txStaticCost, txProportionCost]
  );
  const renderedDividendContent = useMemo(
    () => renderContent(dividendStaticCost, dividendProportionCost, "dividend"),
    [renderContent, dividendStaticCost, dividendProportionCost]
  );

  return (
    <Modal
      onOk={handleSubmit as any}
      onCancel={handleModalClose as any}
      visible={isModalOpen}
      title="STOCK PROFILE"
    >
      {renderedTxContent}
      <InputText {...formikProps} label="Static cost" name="txStaticCost" />
      <InputText
        {...formikProps}
        label="Proportional cost"
        name="txProportionCost"
      />
      <Divider />
      {renderedDividendContent}
      <InputText
        {...formikProps}
        label="Dividend static cost"
        name="dividendStaticCost"
      />
      <InputText
        {...formikProps}
        label="Dividend proportional cost"
        name="dividendProportionCost"
      />
    </Modal>
  );
}

StockProfileDialog.propTypes = {
  handleStockProfileChange: PropTypes.func.isRequired
};
export default withFormik<IStockProfileDialogProps, IStockProfile>({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    txStaticCost: Yup.number().required(),
    txProportionCost: Yup.number()
      .max(1)
      .min(0)
      .required()
  }),
  handleSubmit: async (
    values,
    { props: { handleStockProfileChange }, ...formikProps }
  ) => {
    const submitValues = {
      txStaticCost: values.txStaticCost,
      txProportionCost: values.txProportionCost,
      dividendStaticCost: values.dividendStaticCost,
      dividendProportionCost: values.dividendProportionCost
    };
    await handleStockProfileChange(submitValues, formikProps);
    formikProps.setSubmitting(false);
  }
})(memo(StockProfileDialog));

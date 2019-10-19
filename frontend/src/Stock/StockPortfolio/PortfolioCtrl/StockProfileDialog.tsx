import React, { memo, useMemo } from "react";
import { Modal } from "antd";
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";

import { InputText } from "../../../Base/Form";

import PropTypes from "prop-types";

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
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
  const { txStaticCost, txProportionCost } = values;

  const renderedContent = useMemo(
    () =>
      `Your cost will be calculated as: ${txStaticCost ||
        0} + ${txProportionCost} * Gross value`,
    [txStaticCost, txProportionCost]
  );

  return (
    <Modal
      onOk={handleSubmit as any}
      onCancel={handleModalClose as any}
      visible={isModalOpen}
      title="STOCK PROFILE"
    >
      {renderedContent}
      <InputText {...formikProps} label="Static cost" name="txStaticCost" />
      <InputText
        {...formikProps}
        label="Proportional cost"
        name="txProportionCost"
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
      txProportionCost: values.txProportionCost
    };
    await handleStockProfileChange(submitValues, formikProps);
    formikProps.setSubmitting(false);
  }
})(memo(StockProfileDialog));

import React, { ReactNode, memo, useCallback, useMemo } from "react";
import { Modal } from "antd";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { InputSelect, InputText } from "../../../Base/Form";

import classNames from "./EditAlertModal.module.scss";

type TCondition = "COND_ABOVE" | "COND_BELOW";
interface IFormikVal {
  marketPriceValue: number;
  marketPriceCondition: TCondition;
  ccassPercentValue: number;
  ccassPercentCondition: TCondition;
}

interface IEditAlertModalProps {
  handleCancel: () => any;
  isVisible: boolean;
}
interface IFormikProps extends IEditAlertModalProps, Partial<IFormikVal> {
  handleAlertSubmit: (v: IFormikVal, f: any) => any;
}

function EditAlertModal({
  isVisible,
  handleCancel,

  ...formikApis
}: IEditAlertModalProps & FormikProps<IFormikVal>) {
  const { handleSubmit, isSubmitting } = formikApis;

  const renderSelect = useCallback(
    (label: string, name: string) => (
      <div className={classNames.addonContainer}>
        <InputSelect
          {...formikApis}
          choices={[
            { name: "When above", id: "COND_ABOVE" },
            { name: "When below", id: "COND_BELOW" }
          ]}
          label={label}
          name={name}
        />
      </div>
    ),
    [formikApis]
  );
  const renderText = useCallback(
    (
      label: string,
      name: string,
      renderedSelect: ReactNode,
      renderedAfter: ReactNode
    ) => (
      <div className={classNames.inputTextContainer}>
        <InputText
          {...formikApis}
          addonAfter={renderedAfter}
          addonBefore={renderedSelect}
          label={label}
          name={name}
          type="number"
        />
      </div>
    ),
    [formikApis]
  );

  const renderedPrice = useMemo(
    () =>
      renderText(
        "Market price ($HKD)",
        "marketPriceValue",
        renderSelect("When price is", "marketPriceCondition"),
        "$"
      ),
    [renderSelect, renderText]
  );
  const renderedCCASS = useMemo(
    () =>
      renderText(
        "CCASS %",
        "ccassPercentValue",
        renderSelect("When CCASS % is", "ccassPercentCondition"),
        "%"
      ),
    [renderSelect, renderText]
  );

  return (
    <Modal
      confirmLoading={isSubmitting}
      onCancel={handleCancel as any}
      onOk={handleSubmit as any}
      title="Configure your alerts"
      visible={isVisible}
    >
      {renderedPrice}
      {renderedCCASS}
    </Modal>
  );
}

EditAlertModal.propTypes = {
  handleAlertSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default withFormik<IFormikProps, IFormikVal>({
  validationSchema: Yup.object().shape({
    marketPriceValue: Yup.number().min(0),
    marketPriceCondition: Yup.mixed().oneOf(["COND_ABOVE", "COND_BELOW"]),
    ccassPercentValue: Yup.number()
      .min(0)
      .max(100),
    ccassPercentCondition: Yup.mixed().oneOf(["COND_ABOVE", "COND_BELOW"])
  }),
  handleSubmit: async (
    values,
    { props: { handleAlertSubmit }, ...formApis }
  ) => {
    const submitValues = {
      marketPriceValue: values.marketPriceValue,
      marketPriceCondition: values.marketPriceCondition,
      ccassPercentValue: values.ccassPercentValue,
      ccassPercentCondition: values.ccassPercentCondition
    };
    await handleAlertSubmit(submitValues, formApis);
    formApis.setSubmitting(false);
  }
})(memo(EditAlertModal));

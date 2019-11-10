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
  lastTriggerAt?: Date;
}
interface IFormikProps extends IEditAlertModalProps, Partial<IFormikVal> {
  handleAlertSubmit: (v: IFormikVal, f: any) => any;
}

function EditAlertModal({
  isVisible,
  handleCancel,
  lastTriggerAt,
  ...formikApis
}: IEditAlertModalProps & FormikProps<IFormikVal>) {
  const { handleSubmit, isSubmitting } = formikApis;

  const renderSelect = useCallback(
    (label: string, name: string) => (
      <div className={classNames.addonContainer}>
        <InputSelect
          choices={[
            { name: "When above", id: "COND_ABOVE" },
            { name: "When below", id: "COND_BELOW" }
          ]}
          label={label}
          name={name}
        />
      </div>
    ),
    []
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
          addonAfter={renderedAfter}
          addonBefore={renderedSelect}
          label={label}
          name={name}
          type="number"
        />
      </div>
    ),
    []
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

  const renderedLastTriggerAtMessage = useMemo(
    () => {
      if (!lastTriggerAt) return <></>;
      const triggerAtStr = lastTriggerAt.toLocaleDateString();
      return (
        <div className={classNames.triggeredMessage}>
          <p>
            <span className={classNames.star}>*</span>
            Your alert has been triggered on {triggerAtStr}. To resume, hit OK
            again to save.
          </p>
        </div>
      );
    },
    [lastTriggerAt]
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
      {renderedLastTriggerAtMessage}
    </Modal>
  );
}

EditAlertModal.propTypes = {
  handleAlertSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default withFormik<IFormikProps, IFormikVal>({
  enableReinitialize: true,
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

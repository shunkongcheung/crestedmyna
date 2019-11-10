import { useCallback, useMemo } from "react";
import * as Yup from "yup";

interface IStockTx {
  txType: "BUY" | "SELL" | "DIVIDEND";
  shareCount: number;
  price: number;
  txAt: Date;
}

function useStockTxAdd(handleAddTx: (st: IStockTx, f: any) => any) {
  const handleSubmit = useCallback(
    async (values, formikProps) => {
      const submitValues: IStockTx = {
        txType: values.txType,
        txAt: values.txAt,
        price: values.price,
        shareCount: values.shareCount
      };
      await handleAddTx(submitValues, formikProps);
      formikProps.setSubmitting(false);
    },
    [handleAddTx]
  );

  const validationSchmea = useMemo(
    () =>
      Yup.object().shape({
        txType: Yup.string()
          .oneOf(["BUY", "SELL", "DIVIDEND"])
          .required(),
        txAt: Yup.date().required(),
        price: Yup.number()
          .min(0.00000001)
          .required(),
        shareCount: Yup.number()
          .min(0.00000001)
          .required()
      }),
    []
  );

  return { handleSubmit, validationSchmea };
}

export default useStockTxAdd;

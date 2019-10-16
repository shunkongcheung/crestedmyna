import { useCallback, useEffect, useState } from "react";

import { useDetailState, useEditState } from "../../Base/Fetches";

interface IStockProfile {
  txStaticCost: number;
  txProportionCost: number;
}
interface IStockProfileState {
  stockProfile: IStockProfile;
  isLoading: boolean;
}

interface IStockProfileRet {
  tx_static_cost: number;
  tx_proportion_cost: number;
}

function useStockProfile() {
  const [stockProfileState, setStockProfileState] = useState<
    IStockProfileState
  >({
    isLoading: true,
    stockProfile: { txStaticCost: 0, txProportionCost: 0 }
  });
  const { fetchDetail } = useDetailState<IStockProfileRet>();
  const { fetchEdit } = useEditState<IStockProfileRet>();

  // methods ---------------------------------------------------
  const getStockProfileFromPayload = useCallback(
    payload => ({
      txStaticCost: payload.tx_static_cost,
      txProportionCost: payload.tx_proportion_cost
    }),
    []
  );

  const initStockProfile = useCallback(
    async () => {
      const { ok, payload } = await fetchDetail("stock/stk_portfolio/profile/");
      if (!ok)
        return setStockProfileState(oState => ({
          ...oState,
          isLoading: false
        }));
      setStockProfileState(oState => ({
        isLoading: false,
        stockProfile: getStockProfileFromPayload(payload)
      }));
    },
    [fetchDetail, getStockProfileFromPayload]
  );

  const handleStockProfileChange = useCallback(
    async (data: IStockProfile, formApis: any) => {
      const { ok, payload } = await fetchEdit(
        "stock/stk_portfolio/profile/",
        {
          tx_static_cost: data.txStaticCost,
          tx_proportion_cost: data.txProportionCost
        },
        { method: "PUT", formApis }
      );

      if (!ok) return ok;
      setStockProfileState(oState => ({
        isLoading: false,
        stockProfile: getStockProfileFromPayload(payload)
      }));

      return ok;
    },
    [fetchEdit, getStockProfileFromPayload]
  );

  // life cycle -----------------------------------------------
  useEffect(
    () => {
      initStockProfile();
    },
    [initStockProfile]
  );

  // return  --------------------------------------------------
  return { ...stockProfileState, handleStockProfileChange };
}

export default useStockProfile;

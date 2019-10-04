import useStockDetail from "./useStockDetail";

function useStockContainer() {
  const stockDetailState = useStockDetail();

  return {
    stockDetailState
  };
}

export default useStockContainer;

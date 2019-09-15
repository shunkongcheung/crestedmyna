import { useCallback, useContext } from "react";
import { AuthContext } from "../Contexts";

function useFetchBaseState<IRetDataType = object>() {
  const { token } = useContext(AuthContext);
  const getAuthorization = useCallback(
    (isAuthenticated: boolean) => {
      return !isAuthenticated || !token ? "" : `JWT ${token}`;
    },
    [token]
  );

  interface IResBase {
    ok: boolean;
    status: number;
    text: () => Promise<string>;
  }
  type TConcatRetDataType = IRetDataType & { error?: string };

  type TGetJsonParsedPayload = (r: IResBase) => Promise<TConcatRetDataType>;
  const getJsonParsedPayload: TGetJsonParsedPayload = useCallback(async res => {
    try {
      const payloadString = await res.text();
      return JSON.parse(payloadString) as TConcatRetDataType;
    } catch (ex) {
      return { error: ex.message } as TConcatRetDataType;
    }
  }, []);

  // return ------------------------------------------------------
  return { getAuthorization, getJsonParsedPayload };
}

export default useFetchBaseState;

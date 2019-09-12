import { useCallback, useContext  } from "react";
import { stringify } from "query-string";

import AuthContext from "../Contexts/AuthContext";

function useFetchState<IRetDataType = object, IFetchDataType = IRetDataType>() {
  type TMethod = "GET" | "PUT" | "POST" | "DELETE";
  interface IResBase {
    ok: boolean;
    status: number;
    text: () => Promise<string>;
    blob: () => Promise<any>;
  }
  type TConcatRetDataType = IRetDataType & { error?: string };

  const { token } = useContext(AuthContext);

  const getAuthorization = useCallback(
    (isAuthenticated: boolean) => {
      return !isAuthenticated || !token ? "" : `JWT ${token}`;
    },
    [token]
  );

  type TGetRestfulBody = (
    data: IFetchDataType,
    method: TMethod
  ) => string | undefined;
  const getRestfulBody: TGetRestfulBody = useCallback((data, method) => {
    if (method !== "POST" && method !== "PUT") return;
    return JSON.stringify(data);
  }, []);

  type TGetQueryParams = (q: object) => string;
  const getQueryString: TGetQueryParams = useCallback(queryParams => {
    if (!Object.keys(queryParams).length) return "";
    const uParams: { [x: string]: any } = {};

    Object.entries(queryParams).map(([key, value]) => {
      if (Array.isArray(value)) uParams[key] = value.join(",");
      else uParams[key] = value;
      return null;
    });
    return `?${stringify(uParams)}`;
  }, []);

  type TGetJsonParsedPayload = (r: IResBase) => Promise<TConcatRetDataType>;
  const getJsonParsedPayload: TGetJsonParsedPayload = useCallback(async res => {
    try {
      const payloadString = await res.text();
      return JSON.parse(payloadString) as TConcatRetDataType;
    } catch (ex) {
      return { error: ex.message } as TConcatRetDataType;
    }
  }, []);

  interface IFixedParams {
    data?: IFetchDataType;
    isAuthenticated?: boolean;
    method?: TMethod;
    queryParams?: object;
  }
  interface IResPacket {
    ok: boolean;
		status:number;
    payload: TConcatRetDataType;
  }
  const makeRestfulFetch = useCallback(
    async function(url: string, params: IFixedParams): Promise<IResPacket> {
      const {
        data = {} as IFetchDataType,
        method = "GET",
        isAuthenticated = false,
        queryParams = {}
      } = params;

      const Authorization = getAuthorization(isAuthenticated);
      const headers = { Authorization, "Content-Type": "application/json" };
      const body = getRestfulBody(data, method);
      const queryString = getQueryString(queryParams);
      url = `/api/${url}${queryString}`;

      const res: IResBase = await fetch(url, {
        headers,
        body,
        method
      } as RequestInit);
      const payload = (await getJsonParsedPayload(res)) as IRetDataType & {
        error?: string;
      };

      return { ok: res.ok, payload, status:res.status };
    },
    [getAuthorization, getJsonParsedPayload, getRestfulBody, getQueryString]
  );

  return { makeRestfulFetch };
}

export default useFetchState;

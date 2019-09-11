import { useCallback, useMemo } from "react";
import { stringify } from "query-string";

function useFetchState<IRetDataType = object, IFetchDataType = IRetDataType>() {
  type TMethod = "GET" | "PUT" | "POST" | "DELETE";
  interface IResBase {
    ok: boolean;
    status: number;
    text: () => Promise<string>;
    blob: () => Promise<any>;
  }
  type TConcatRetDataType = IRetDataType & { error?: string };

  const token = useMemo(() => {
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InNodW4uY2hldW5nIiwiZXhwIjoxNTk5NzE4ODkyLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTY4MTgyODkyfQ.RDPix9Zbui2DjsUfTLCV6nscF_ntPBjo-sV26ZpLf6s";
  }, []);

  const getAuthorization = useCallback(
    (isAuthenticated: boolean) => {
      if (!isAuthenticated) return "";
      /* const token = localStorage.getItem(tokenStorageName); */
      if (!token) return "";
      return `JWT ${token}`;
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
    status: number;
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

      return { ok: res.ok, status: res.status, payload };
    },
    [getAuthorization, getJsonParsedPayload, getRestfulBody, getQueryString]
  );

  return { makeRestfulFetch };
}

export default useFetchState;

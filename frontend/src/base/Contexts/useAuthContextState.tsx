import { useCallback, useEffect, useState, useMemo } from "react";

const defaultUserInfo = {
  id: -1,
  username: "",
  email: "",
  firstName: "string",
  lastName: ""
};

function useAuthContextState() {
  const tokenStorageName = useMemo(() => "aSdFlKjQeRpIouSadfLnZxv", []);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [expireAt, setExpireAt] = useState("");

  const setUserInfoAndExpireAtFromToken = useCallback(token => {
    const splitted = token.split(".");
    if (splitted.length === 3) {
      const tokenContent = splitted[1];
      const tokenInfo = JSON.parse(atob(tokenContent));
      const userInfo = {
        id: tokenInfo.user_id,
        email: tokenInfo.email,
        username: tokenInfo.username,
        firstName: tokenInfo.first_name,
        lastName: tokenInfo.last_name
      };
      setUserInfo(userInfo);

      const date = new Date(0);
      date.setUTCSeconds(tokenInfo.exp);
      setExpireAt(date.toString());
    } else {
      setUserInfo(defaultUserInfo);
      setExpireAt("");
    }
  }, []);

  const handleTokenChange = useCallback(
    (token: string) => {
      setToken(token);
      setUserInfoAndExpireAtFromToken(token);
      localStorage.setItem(tokenStorageName, token);
    },
    [tokenStorageName, setUserInfoAndExpireAtFromToken]
  );

  useEffect(
    () => {
      const storedToken = localStorage.getItem(tokenStorageName);
      if (storedToken) handleTokenChange(storedToken);
    },
    [tokenStorageName, handleTokenChange]
  );

  return { expireAt, handleTokenChange, token, userInfo };
}

export default useAuthContextState;

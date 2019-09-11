import { useCallback, useEffect, useState, useMemo } from "react";

function useAuthContextState() {
  const tokenStorageName = useMemo(() => "aSdFlKjQeRpIouSadfLnZxv", []);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    id: -1,
    username: "",
    email: "",
    firstName: "string",
    lastName: ""
  });

  useEffect(
    () => {
      const storedToken = localStorage.getItem(tokenStorageName);
      if (storedToken) setToken(storedToken);
    },
    [tokenStorageName]
  );

  const setUserInfoFromToken = useCallback(token => {
    const splitted = token.split(".");
    if (splitted.length === 3) {
      const tokenContent = splitted[1];
      const tokenUserInfo = JSON.parse(atob(tokenContent));
      const userInfo = {
        id: tokenUserInfo.user_id,
        email: tokenUserInfo.email,
        username: tokenUserInfo.username,
        firstName: tokenUserInfo.first_name,
        lastName: tokenUserInfo.last_name
      };
      setUserInfo(userInfo);
    }
  }, []);

  const handleTokenChange = useCallback(
    (token: string) => {
      setToken(token);
      setUserInfoFromToken(token);
      localStorage.setItem(tokenStorageName, token);
    },
    [tokenStorageName, setUserInfoFromToken]
  );

  return { handleTokenChange, token, userInfo };
}

export default useAuthContextState;

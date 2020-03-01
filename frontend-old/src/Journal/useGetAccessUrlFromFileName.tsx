import { useCallback, useContext } from "react";

import { AuthContext } from "../Base/Contexts";

function useGetAccessUrlFromFileName() {
  const { token: authToken } = useContext(AuthContext);
  const getAccessUrlFromFileName = useCallback(
    fileName => {
      const accessUrl = `/api/general/gnl_media/resolve/${fileName}?auth=${authToken}`;
      return accessUrl;
    },
    [authToken]
  );

  return { getAccessUrlFromFileName };
}

export default useGetAccessUrlFromFileName;

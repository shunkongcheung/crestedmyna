import { useMemo } from "react";

function useGetIdOrCreateState(regExp: RegExp) {
  const idOrCreate = useMemo<"create" | number>(
    () => {
      const { pathname } = window.location;
      const matches = pathname.match(regExp);
      if (!Array.isArray(matches) || matches.length <= 0) return "create";
      const id = Number(matches[1]) as number;
      return id;
    },
    [regExp]
  );

  return idOrCreate;
}

export default useGetIdOrCreateState;

import { useState } from "react";

function useMsgContextState() {
  interface IMsgContext {
    message?: string;
    type: "info" | "warning" | "error";
  }
  const [msgInfo, handleMessageChange] = useState<IMsgContext>({
    message: "",
    type: "info"
  });
  return { msgInfo, handleMessageChange };
}

export default useMsgContextState;

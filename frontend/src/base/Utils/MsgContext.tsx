import { createContext } from "react";

interface IMessageInfo {
  message?: string;
  type: "info" | "warning" | "error";
}
interface IMsgContext {
  handleMessageChange: (a: IMessageInfo) => void;
  msgInfo: IMessageInfo;
}

const MsgContext = createContext<IMsgContext>({
  handleMessageChange: a => {},
  msgInfo: {
    message: "",
    type: "info"
  }
});
export default MsgContext;

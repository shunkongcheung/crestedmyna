import { createContext } from "react";

interface IAuthContext {
  handleTokenChange: (t: string) => void;
  token: string;
  userInfo: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  expireAt: string;
}
const AuthContext = createContext<IAuthContext>({
  handleTokenChange: () => {},
  token: "",
  userInfo: {
    id: -1,
    username: "",
    email: "",
    firstName: "",
    lastName: ""
  },
  expireAt: ""
});
export default AuthContext;

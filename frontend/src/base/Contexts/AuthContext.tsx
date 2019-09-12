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
  isLogined: boolean;
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
isLogined: false,
  
});
export default AuthContext;

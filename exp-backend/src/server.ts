import { getExpressApp } from "shunkongcheung-express-starter";

import router from "./routes";
import { File, User } from "./entities";

const expressApp = getExpressApp({ router, userModel: User, fileModel: File });
const { app, serverlessHandler } = expressApp;

// finish and export
export const handler = serverlessHandler;
export default app;

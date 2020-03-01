import { getExpressApp } from "express-typescript-s3-starter";

import router from "./routes";
import { File, User } from "./entities";

const expressApp = getExpressApp({ router, userModel: User, fileModel: File });
const { app, serverlessHandler } = expressApp;

// finish and export
export const handler = serverlessHandler;
export default app;

import serverless from "serverless-http";
import { getExpressApp } from "shunkongcheung-express-starter";

import router from "./routes";

import { User } from "./entities";

const app = getExpressApp({ router, userModel: User });

// finish and export
export const handler = serverless(app);
export default app;

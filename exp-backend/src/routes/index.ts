import express from "express";

import auth from "./auth";
import game from "./game";
import files from "./files";
import hello from "./hello";
import todos from "./todos";

const router = express.Router();

router.use("/auth", auth);
router.use("/game", game);
router.use("/files", files);
router.use("/todos", todos);
router.use("/", hello);

export default router;

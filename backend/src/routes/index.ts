import express from "express";

import game from "./game";
import hello from "./hello";

const router = express.Router();

router.use("/game", game);
router.use("/", hello);

export default router;

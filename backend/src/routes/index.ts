import express from "express";

import hello from "./hello";
import sudoku from "./sudoku";
import weather from "./weather";

import tasks from "./tasks";

const router = express.Router();

router.use("/sudoku", sudoku);
router.use("/weather", weather);
router.use("/tasks", tasks);
router.use("/", hello);

export default router;

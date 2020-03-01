import express from "express";

import sudoku from "./sudoku";
import hello from "./hello";

const router = express.Router();

router.use("/sudoku", sudoku);
router.use("/", hello);

export default router;

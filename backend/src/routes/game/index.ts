import { Router, Response, NextFunction } from "express";

import sudoku from "./sudoku";

const router = Router();

router.use("/sudoku", sudoku);
router.get("/", (_: any, res: Response, next: NextFunction) => {
  res.send({ msg: "game is ready" });
  next();
});

export default router;

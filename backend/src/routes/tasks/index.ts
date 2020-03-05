import express from "express";

import genComicMasters from "./genComicMasters";

const router = express.Router();

router.use("/gen-comic-masters", genComicMasters);

export default router;

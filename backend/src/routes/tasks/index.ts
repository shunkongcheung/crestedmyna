import express from "express";

import genComicChapters from "./genComicChapters";
import genComicMasters from "./genComicMasters";

const router = express.Router();

router.use("/gen-comic-chapters", genComicChapters);
router.use("/gen-comic-masters", genComicMasters);

export default router;

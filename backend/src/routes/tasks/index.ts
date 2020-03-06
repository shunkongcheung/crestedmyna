import express from "express";

import genComicChapters from "./genComicChapters";
import genComicMasters from "./genComicMasters";
import genComicPages from "./genComicPages";

const router = express.Router();

router.use("/gen-comic-chapters", genComicChapters);
router.use("/gen-comic-masters", genComicMasters);
router.use("/gen-comic-pages", genComicPages);

export default router;

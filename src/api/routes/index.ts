import { Router } from "express";

import { articlesRouter } from "./article.routes";
import { authorsRouter } from "./author.routes";

const router = Router();

router.use("/articles", articlesRouter);
router.use("/authors", authorsRouter);

export { router };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const article_routes_1 = require("./article.routes");
const author_routes_1 = require("./author.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/articles", article_routes_1.articlesRouter);
router.use("/authors", author_routes_1.authorsRouter);
//# sourceMappingURL=index.js.map
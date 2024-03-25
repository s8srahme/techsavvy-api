"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = exports.Article = void 0;
const Article_model_1 = require("./article/Article.model");
Object.defineProperty(exports, "Article", { enumerable: true, get: function () { return Article_model_1.Article; } });
const Author_model_1 = require("./author/Author.model");
Object.defineProperty(exports, "Author", { enumerable: true, get: function () { return Author_model_1.Author; } });
Author_model_1.Author.hasMany(Article_model_1.Article, {
    foreignKey: "authorId"
});
Article_model_1.Article.belongsTo(Author_model_1.Author, {
    foreignKey: "authorId"
});
//# sourceMappingURL=index.js.map
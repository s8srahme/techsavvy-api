"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArticle = void 0;
const author_mappers_1 = require("../author/author.mappers");
const toArticle = (article) => {
    const transformedArticle = {
        id: article.id,
        title: article.title,
        description: article.description,
        image: article.image,
        alt: article.alt,
        slug: article.slug,
        claps: article.claps,
        category: article.category,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt
    };
    if (article.Author) {
        const transformedAuthor = (0, author_mappers_1.toAuthor)(article.Author);
        transformedArticle.author = transformedAuthor;
    }
    else {
        transformedArticle.authorId = article.authorId;
    }
    return transformedArticle;
};
exports.toArticle = toArticle;
//# sourceMappingURL=article.mappers.js.map
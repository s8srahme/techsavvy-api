"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.getAll = exports.getById = exports.update = exports.bulkCreate = exports.create = void 0;
const query_helpers_1 = require("../../../utils/helpers/query.helpers");
const article_helpers_1 = require("./article.helpers");
const models_1 = require("../../models");
const create = async (payload) => {
    const article = (await models_1.Article.create(payload));
    return article;
};
exports.create = create;
const bulkCreate = async (payload) => {
    const articles = (await models_1.Article.bulkCreate(payload));
    return articles;
};
exports.bulkCreate = bulkCreate;
const update = async (id, payload) => {
    const article = await models_1.Article.findByPk(id);
    if (!article) {
        throw new Error("Article not found");
    }
    const updatedArticle = await article.update(payload);
    return updatedArticle;
};
exports.update = update;
const getById = async (id) => {
    const article = (await models_1.Article.findByPk(id, {
        include: { model: models_1.Author }
    }));
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
};
exports.getById = getById;
const getAll = async (queryString) => {
    const queryParams = (0, query_helpers_1.parseQueryString)(queryString);
    const { count, rows } = await models_1.Article.findAndCountAll(Object.assign({ include: { model: models_1.Author }, order: (0, article_helpers_1.buildSortQuery)((queryParams === null || queryParams === void 0 ? void 0 : queryParams.sort) || {}), where: Object.assign({}, (0, article_helpers_1.buildFilterQuery)((queryParams === null || queryParams === void 0 ? void 0 : queryParams.filter) || {})) }, (0, article_helpers_1.buildPaginationQuery)(queryParams === null || queryParams === void 0 ? void 0 : queryParams.pagination)));
    return { pagination: (0, article_helpers_1.toPagination)(count, queryParams === null || queryParams === void 0 ? void 0 : queryParams.pagination), data: rows };
};
exports.getAll = getAll;
const deleteById = async (id) => {
    const deletedArticleCount = await models_1.Article.destroy({
        where: { id }
    });
    return Boolean(deletedArticleCount);
};
exports.deleteById = deleteById;
//# sourceMappingURL=article.dal.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.retrieveMany = exports.retrieveOne = exports.updateOne = exports.createMany = exports.createOne = void 0;
const article_dal_1 = require("../../db/dal/article/article.dal");
const helpers_1 = require("../../utils/helpers");
const createOne = (payload) => {
    const slug = (0, helpers_1.slugify)(payload.title);
    const updatedPayload = Object.assign(Object.assign({}, payload), { slug });
    return (0, article_dal_1.create)(updatedPayload);
};
exports.createOne = createOne;
const createMany = (payload) => {
    const updatedPayload = payload.map((article) => {
        const slug = (0, helpers_1.slugify)(article.title);
        const updatedArticle = Object.assign(Object.assign({}, article), { slug });
        return updatedArticle;
    });
    return (0, article_dal_1.bulkCreate)(updatedPayload);
};
exports.createMany = createMany;
const updateOne = (id, payload) => {
    return (0, article_dal_1.update)(id, payload);
};
exports.updateOne = updateOne;
const retrieveOne = (id) => {
    return (0, article_dal_1.getById)(id);
};
exports.retrieveOne = retrieveOne;
const retrieveMany = (queryString) => {
    return (0, article_dal_1.getAll)(queryString);
};
exports.retrieveMany = retrieveMany;
const deleteOne = (id) => {
    return (0, article_dal_1.deleteById)(id);
};
exports.deleteOne = deleteOne;
//# sourceMappingURL=article.service.js.map
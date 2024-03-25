"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.getAll = exports.getById = exports.update = exports.create = void 0;
const models_1 = require("../../models");
const create = async (payload) => {
    const author = await models_1.Author.create(payload);
    return author;
};
exports.create = create;
const update = async (id, payload) => {
    const author = await models_1.Author.findByPk(id);
    if (!author) {
        throw new Error("Author not found");
    }
    const updatedAuthor = await author.update(payload);
    return updatedAuthor;
};
exports.update = update;
const getById = async (id) => {
    const author = await models_1.Author.findByPk(id);
    if (!author) {
        throw new Error("Author not found");
    }
    return author;
};
exports.getById = getById;
const getAll = async (filters) => {
    return models_1.Author.findAll(Object.assign({}, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && { paranoid: true })));
};
exports.getAll = getAll;
const deleteById = async (id) => {
    const deletedArticleCount = await models_1.Author.destroy({
        where: { id }
    });
    return Boolean(deletedArticleCount);
};
exports.deleteById = deleteById;
//# sourceMappingURL=author.dal.js.map
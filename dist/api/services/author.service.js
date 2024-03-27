"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.retrieveMany = exports.retrieveOne = exports.updateOne = exports.createMany = exports.createOne = void 0;
const author_dal_1 = require("../../db/dal/author/author.dal");
const createOne = (payload) => {
    return (0, author_dal_1.create)(payload);
};
exports.createOne = createOne;
const createMany = (payload) => {
    return (0, author_dal_1.bulkCreate)(payload);
};
exports.createMany = createMany;
const updateOne = (id, payload) => {
    return (0, author_dal_1.update)(id, payload);
};
exports.updateOne = updateOne;
const retrieveOne = (id) => {
    return (0, author_dal_1.getById)(id);
};
exports.retrieveOne = retrieveOne;
const retrieveMany = (filters) => {
    return (0, author_dal_1.getAll)(filters);
};
exports.retrieveMany = retrieveMany;
const deleteOne = (id) => {
    return (0, author_dal_1.deleteById)(id);
};
exports.deleteOne = deleteOne;
//# sourceMappingURL=author.service.js.map
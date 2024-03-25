"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilterQuery = exports.buildSortQuery = exports.buildPaginationQuery = exports.toPagination = void 0;
const sequelize_1 = require("sequelize");
const toPagination = (count, pagination) => {
    const limit = Number((pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10);
    const page = Number((pagination === null || pagination === void 0 ? void 0 : pagination.page) || 1);
    return {
        limit,
        page,
        totalPages: Math.ceil(count / limit),
        count
    };
};
exports.toPagination = toPagination;
const buildPaginationQuery = (pagination) => {
    const limit = Number((pagination === null || pagination === void 0 ? void 0 : pagination.limit) || 10);
    const page = Number((pagination === null || pagination === void 0 ? void 0 : pagination.page) || 1);
    const paginationOptions = { limit, offset: (page - 1) * limit };
    return paginationOptions;
};
exports.buildPaginationQuery = buildPaginationQuery;
const buildSortQuery = (sort) => {
    const order = [...Object.entries(sort)];
    return order;
};
exports.buildSortQuery = buildSortQuery;
const buildFilterQuery = (filters) => {
    let where = {};
    const { claps, category, createdAt } = filters;
    if (category) {
        if (typeof category === "string")
            where.category = { [sequelize_1.Op.eq]: category };
        else if (Array.isArray(category))
            where.category = { [sequelize_1.Op.or]: category };
    }
    if (claps) {
        if (typeof claps === "string")
            where.claps = { [sequelize_1.Op.eq]: claps };
        else if (Array.isArray(claps))
            where.claps = { [sequelize_1.Op.or]: claps };
        else if (claps) {
            where = Object.assign(Object.assign({}, where), { [sequelize_1.Op.and]: {
                    claps: Object.assign(Object.assign(Object.assign(Object.assign({}, (claps.lt && { [sequelize_1.Op.lt]: claps.lt })), (claps.lte && { [sequelize_1.Op.lte]: claps.lte })), (claps.gt && { [sequelize_1.Op.gt]: claps.gt })), (claps.gte && { [sequelize_1.Op.gte]: claps.gte }))
                } });
        }
    }
    if (createdAt) {
        const { gte = "1970-01-01T00:00:00Z", lt = new Date().toISOString() } = createdAt;
        const startDate = new Date(gte);
        const endDate = new Date(lt);
        where = Object.assign(Object.assign({}, where), { [sequelize_1.Op.and]: {
                createdAt: {
                    [sequelize_1.Op.lt]: endDate,
                    [sequelize_1.Op.gte]: startDate
                }
            } });
    }
    return where;
};
exports.buildFilterQuery = buildFilterQuery;
//# sourceMappingURL=article.helpers.js.map
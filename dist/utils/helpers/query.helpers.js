"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryString = exports.parseQueryString = void 0;
const qs_1 = __importDefault(require("qs"));
const SORT_ORDERS = ["asc", "desc"];
const isSortOrderFound = (sortParamValue) => {
    return SORT_ORDERS.some((order) => sortParamValue.includes(order));
};
const getSortValueMapping = (sortParamValue) => {
    const [field, order = "asc"] = sortParamValue.split(":");
    return { [field]: order };
};
const parseQueryString = (queryString) => {
    const parsedParams = qs_1.default.parse(queryString, { comma: true, ignoreQueryPrefix: true });
    const paramsMapping = {};
    Object.keys(parsedParams).forEach((paramKey) => {
        if (paramKey === "sort") {
            const sortParamValues = (typeof parsedParams[paramKey] === "string" ? [parsedParams[paramKey]] : parsedParams[paramKey]);
            let sort = {};
            if (sortParamValues && Array.isArray(sortParamValues) && isSortOrderFound(sortParamValues[0])) {
                sortParamValues.forEach((paramValue) => {
                    sort = Object.assign(Object.assign({}, sort), getSortValueMapping(paramValue));
                });
            }
            paramsMapping.sort = sort;
        }
        else if (paramKey === "q") {
            const queryParamValue = parsedParams[paramKey];
            const search = Object.assign({}, paramsMapping.search);
            search.query = queryParamValue;
            paramsMapping.search = search;
        }
        else if (paramKey === "page" || paramKey === "limit") {
            const paginationParamValue = parsedParams[paramKey];
            const pagination = Object.assign({}, paramsMapping.pagination);
            pagination[paramKey] = paginationParamValue;
            paramsMapping.pagination = pagination;
        }
        else if (paramKey === "start" || paramKey === "end") {
            const filterParamValue = parsedParams[paramKey];
            const filter = Object.assign({}, paramsMapping.filter);
            const createdAt = (filter.createdAt || {});
            const filterRangeKey = (paramKey === "start" ? "gte" : "lt");
            createdAt[filterRangeKey] = filterParamValue;
            filter.createdAt = createdAt;
            paramsMapping.filter = filter;
        }
        else {
            const filterParamValue = parsedParams[paramKey];
            const filter = Object.assign({}, paramsMapping.filter);
            filter[paramKey] = filterParamValue;
            paramsMapping.filter = filter;
        }
    });
    return paramsMapping;
};
exports.parseQueryString = parseQueryString;
const getQueryString = (req) => {
    const queryString = new URL(req.originalUrl, `http://${req.headers.host}`);
    return queryString.search;
};
exports.getQueryString = getQueryString;
//# sourceMappingURL=query.helpers.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.retrieveMany = exports.retrieveOne = exports.updateOne = exports.createOne = void 0;
const articleService = __importStar(require("@/api/services/article.service"));
const query_helpers_1 = require("@/utils/helpers/query.helpers");
const response_types_1 = require("@/utils/types/response.types");
const article_mappers_1 = require("./article.mappers");
const createOne = async (req, res) => {
    try {
        const payload = req.body;
        const article = (0, article_mappers_1.toArticle)(await articleService.createOne(payload));
        return res.status(201).json({ status: response_types_1.ResponseStatus.SUCCESS, data: article });
    }
    catch (err) {
        return res.status(400).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.createOne = createOne;
const updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const article = (0, article_mappers_1.toArticle)(await articleService.updateOne(id, payload));
        return res.status(201).json({ status: response_types_1.ResponseStatus.SUCCESS, data: article });
    }
    catch (err) {
        return res.status(404).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.updateOne = updateOne;
const retrieveOne = async (req, res) => {
    try {
        const { id } = req.params;
        const article = (0, article_mappers_1.toArticle)(await articleService.retrieveOne(id));
        return res.status(200).json({ status: response_types_1.ResponseStatus.SUCCESS, data: article });
    }
    catch (err) {
        return res.status(404).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.retrieveOne = retrieveOne;
const retrieveMany = async (req, res) => {
    try {
        const queryString = (0, query_helpers_1.getQueryString)(req);
        const { pagination, data: articles } = await articleService.retrieveMany(queryString);
        return res.status(200).json({ status: response_types_1.ResponseStatus.SUCCESS, data: articles.map(article_mappers_1.toArticle), pagination });
    }
    catch (err) {
        return res.status(500).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.retrieveMany = retrieveMany;
const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await articleService.deleteOne(id);
        if (isDeleted)
            return res.status(200).json({ status: response_types_1.ResponseStatus.SUCCESS, message: "Article deleted" });
        return res.status(400).json({ status: response_types_1.ResponseStatus.ERROR, message: "Article deletion failed" });
    }
    catch (err) {
        return res.status(500).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.deleteOne = deleteOne;
//# sourceMappingURL=article.controller.js.map
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
const authorService = __importStar(require("@/api/services/author.service"));
const response_types_1 = require("@/utils/types/response.types");
const author_mappers_1 = require("./author.mappers");
const createOne = async (req, res) => {
    try {
        const payload = req.body;
        const author = (0, author_mappers_1.toAuthor)(await authorService.createOne(payload));
        return res.status(201).json({ status: response_types_1.ResponseStatus.SUCCESS, data: author });
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
        const author = (0, author_mappers_1.toAuthor)(await authorService.updateOne(id, payload));
        return res.status(201).json({ status: response_types_1.ResponseStatus.SUCCESS, data: author });
    }
    catch (err) {
        return res.status(404).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.updateOne = updateOne;
const retrieveOne = async (req, res) => {
    try {
        const { id } = req.params;
        const author = (0, author_mappers_1.toAuthor)(await authorService.retrieveOne(id));
        return res.status(200).json({ status: response_types_1.ResponseStatus.SUCCESS, data: author });
    }
    catch (err) {
        return res.status(404).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.retrieveOne = retrieveOne;
const retrieveMany = async (req, res) => {
    try {
        const filters = req.query;
        const authors = (await authorService.retrieveMany(filters)).map(author_mappers_1.toAuthor);
        return res.status(200).json({ status: response_types_1.ResponseStatus.SUCCESS, data: authors });
    }
    catch (err) {
        return res.status(500).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.retrieveMany = retrieveMany;
const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await authorService.deleteOne(id);
        if (isDeleted)
            return res.status(200).json({ status: response_types_1.ResponseStatus.SUCCESS, message: "Author deleted" });
        return res.status(400).json({ status: response_types_1.ResponseStatus.ERROR, message: "Author deletion failed" });
    }
    catch (err) {
        return res.status(500).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
    }
};
exports.deleteOne = deleteOne;
//# sourceMappingURL=author.controller.js.map
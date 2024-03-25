/**
 * Controller functions get the requested data from the models and return it to the client. These are the route-handler
 * callback functions that the corresponding router will invoke. The callbacks are stored in separate controller
 * modules as this file/module structure offers an appropriate granularity for the project.
 */

import { Request } from "express";

import * as articleService from "@/api/services/article.service";
import { getQueryString } from "@/utils/helpers/query.helpers";
import { ErrorResponse, ResponseStatus, SuccessResponse, TypedResponse } from "@/utils/types/response.types";

import { toArticle } from "./article.mappers";
import type { Article, CreateArticleParams, UpdateArticleParams } from "./article.types";

export const createOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Article> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Article> | ErrorResponse>> => {
	try {
		const payload: CreateArticleParams = req.body;
		const article = toArticle(await articleService.createOne(payload));
		/**
		 * Created: Request succeeded and a new resource was created as a result.
		 */
		return res.status(201).json({ status: ResponseStatus.SUCCESS, data: article });
	} catch (err) {
		/**
		 * Bad Request: Server cannot process request due to something that is perceived to be a client error (e.g.
		 * 							malformed request syntax, invalid request message framing or deceptive request
		 * 							routing).
		 */
		return res.status(400).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

export const updateOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Article> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Article> | ErrorResponse>> => {
	try {
		const { id } = req.params;
		const payload: UpdateArticleParams = req.body;
		const article = toArticle(await articleService.updateOne(id, payload));
		return res.status(201).json({ status: ResponseStatus.SUCCESS, data: article });
	} catch (err) {
		/**
		 * Not Found: Server cannot find requested resource, i.e. endpoint is valid but the resource itself does not
		 * 						exist.
		 */
		return res.status(404).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

export const retrieveOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Article> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Article> | ErrorResponse>> => {
	try {
		const { id } = req.params;
		const article = toArticle(await articleService.retrieveOne(id));
		return res.status(200).json({ status: ResponseStatus.SUCCESS, data: article });
	} catch (err) {
		return res.status(404).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

export const retrieveMany = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Article> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Article> | ErrorResponse>> => {
	try {
		const queryString = getQueryString(req);
		const { pagination, data: articles } = await articleService.retrieveMany(queryString);
		return res.status(200).json({ status: ResponseStatus.SUCCESS, data: articles.map(toArticle), pagination });
	} catch (err) {
		/**
		 * Internal Server Error: Server has encountered a situation it does not know how to handle.
		 */
		return res.status(500).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

export const deleteOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Article> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Article> | ErrorResponse>> => {
	try {
		const { id } = req.params;
		const isDeleted = await articleService.deleteOne(id);
		if (isDeleted) return res.status(200).json({ status: ResponseStatus.SUCCESS, message: "Article deleted" });
		return res.status(400).json({ status: ResponseStatus.ERROR, message: "Article deletion failed" });
	} catch (err) {
		return res.status(500).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

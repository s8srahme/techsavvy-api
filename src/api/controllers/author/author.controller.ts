import { Request } from "express";

import * as authorService from "@/api/services/author.service";
import type { FilterAuthorParams } from "@/db/dal/author/author.types";
import { ErrorResponse, ResponseStatus, SuccessResponse, TypedResponse } from "@/utils/types/response.types";

import { toAuthor } from "./author.mappers";
import type { Author, CreateAuthorParams, UpdateAuthorParams } from "./author.types";

export const createOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Author> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Author> | ErrorResponse>> => {
	try {
		const payload: CreateAuthorParams = req.body;
		const author = toAuthor(await authorService.createOne(payload));
		return res.status(201).json({ status: ResponseStatus.SUCCESS, data: author });
	} catch (err) {
		return res.status(400).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

export const updateOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Author> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Author> | ErrorResponse>> => {
	try {
		const { id } = req.params;
		const payload: UpdateAuthorParams = req.body;
		const author = toAuthor(await authorService.updateOne(id, payload));
		return res.status(201).json({ status: ResponseStatus.SUCCESS, data: author });
	} catch (err) {
		return res.status(404).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

export const retrieveOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Author> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Author> | ErrorResponse>> => {
	try {
		const { id } = req.params;
		const author = toAuthor(await authorService.retrieveOne(id));
		return res.status(200).json({ status: ResponseStatus.SUCCESS, data: author });
	} catch (err) {
		return res.status(404).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

// TODO: Add pagination support for authors retrieval
export const retrieveMany = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Author> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Author> | ErrorResponse>> => {
	try {
		const filters: FilterAuthorParams = req.query;
		const authors = (await authorService.retrieveMany(filters)).map(toAuthor);
		return res.status(200).json({ status: ResponseStatus.SUCCESS, data: authors });
	} catch (err) {
		return res.status(500).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

export const deleteOne = async (
	req: Request,
	res: TypedResponse<SuccessResponse<Author> | ErrorResponse>
): Promise<TypedResponse<SuccessResponse<Author> | ErrorResponse>> => {
	try {
		const { id } = req.params;
		const isDeleted = await authorService.deleteOne(id);
		if (isDeleted) return res.status(200).json({ status: ResponseStatus.SUCCESS, message: "Author deleted" });
		return res.status(400).json({ status: ResponseStatus.ERROR, message: "Author deletion failed" });
	} catch (err) {
		return res.status(500).json({ status: ResponseStatus.ERROR, message: err.message });
	}
};

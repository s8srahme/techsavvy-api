import { Response } from "express";

import { Article } from "@/api/controllers/article/article.types";
import { Author } from "@/api/controllers/author/author.types";

export type ResponsePayload = Article | Author;
export type ResponseManyPayload<D> = {
	pagination: ResponsePagination;
	data: D[];
};
export type PayloadType<D extends ResponsePayload> = D | D[];

export type SuccessResponse<T extends PayloadType<ResponsePayload>> = {
	status: ResponseStatus.SUCCESS;
	message?: string;
	data?: T | T[];
	pagination?: ResponsePagination;
};
export type ErrorResponse = {
	status: ResponseStatus.ERROR;
	message: string;
	errors?: { message: string; field: string }[];
};

export enum ResponseStatus {
	SUCCESS = "success",
	ERROR = "error"
}
export type ResponsePagination = {
	limit: number; // Maximum number of records per page
	page: number; // Current page number
	totalPages: number; // Total number of pages
	count: number; // Total number of records
};

export type TypedResponse<T> = Omit<Response, "json" | "status"> & {
	json(data: T): TypedResponse<T>;
	status(code: number): TypedResponse<T>;
};

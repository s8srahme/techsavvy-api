/**
 * Create a service, which acts as an intermediary between corresponding controller and DAL.
 */

import { create, deleteById, getAll, getById, update } from "@/db/dal/article/article.dal";
import type { ArticleCreationAttributes, ArticleResultAttributes } from "@/db/models";
import { slugify } from "@/utils/helpers";
import { ResponseManyPayload } from "@/utils/types/response.types";

export const createOne = (payload: ArticleCreationAttributes): Promise<ArticleResultAttributes> => {
	const slug = slugify(payload.title);
	const updatedPayload = { ...payload, slug };
	return create(updatedPayload);
};

export const updateOne = (
	id: string,
	payload: Partial<ArticleCreationAttributes>
): Promise<ArticleResultAttributes> => {
	return update(id, payload);
};

export const retrieveOne = (id: string): Promise<ArticleResultAttributes> => {
	return getById(id);
};

export const retrieveMany = (queryString: string): Promise<ResponseManyPayload<ArticleResultAttributes>> => {
	return getAll(queryString);
};

export const deleteOne = (id: string): Promise<boolean> => {
	return deleteById(id);
};

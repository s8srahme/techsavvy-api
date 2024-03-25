/**
 * Data access layer (DAL) is where you implement SQL queries, i.e. it is where Sequelize model queries run.
 */

// import { Op } from "sequelize";

import { parseQueryString } from "@/utils/helpers/query.helpers";
import type { ParameterMapping } from "@/utils/types/query.types";
import { ResponseManyPayload } from "@/utils/types/response.types";

import { buildFilterQuery, buildPaginationQuery, buildSortQuery, toPagination } from "./article.helpers";
import {
	ArticleCreationAttributes,
	Article as ArticleModel,
	ArticleResultAttributes,
	Author as AuthorModel
} from "../../models";

export const create = async (payload: ArticleCreationAttributes): Promise<ArticleResultAttributes> => {
	const article = (await ArticleModel.create(payload)) as ArticleResultAttributes;
	return article;
};

export const update = async (
	id: string,
	payload: Partial<ArticleCreationAttributes>
): Promise<ArticleResultAttributes> => {
	const article = await ArticleModel.findByPk(id);
	if (!article) {
		// TODO: Throw custom error
		throw new Error("Article not found");
	}
	const updatedArticle = await (article as ArticleModel).update(payload);
	return updatedArticle as ArticleResultAttributes;
};

export const getById = async (id: string): Promise<ArticleResultAttributes> => {
	const article = (await ArticleModel.findByPk(id, {
		/**
		 * include option will generate an SQL query with LEFT OUTER JOIN clause, i.e. all rows from Articles table will
		 * be retrieved even when a row has zero Authors row.
		 */
		include: { model: AuthorModel }
	})) as ArticleResultAttributes;
	if (!article) {
		// TODO: Throw custom error
		throw new Error("Article not found");
	}
	return article;
};

export const getAll = async (queryString: string): Promise<ResponseManyPayload<ArticleResultAttributes>> => {
	const queryParams: ParameterMapping = parseQueryString(queryString);
	const { count, rows } = await ArticleModel.findAndCountAll({
		include: { model: AuthorModel },
		order: buildSortQuery(queryParams?.sort || {}), // TODO: Use uppercase value for sort orders
		where: {
			// ...(queryParams?.filter?.isDeleted && { deletedAt: { [Op.not]: null } }),
			...buildFilterQuery(queryParams?.filter || {})
		},
		...buildPaginationQuery(queryParams?.pagination)

		/**
		 * Adding paranoid option to true includes the soft-deleted records with deletedAt set in the result. Otherwise,
		 * results exclude soft deleted records by default.
		 */
		// ...((queryParams?.filter?.isDeleted || queryParams?.filter?.includeDeleted) && { paranoid: true })
	});
	return { pagination: toPagination(count, queryParams?.pagination), data: rows as ArticleResultAttributes[] };
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedArticleCount = await ArticleModel.destroy({
		where: { id }
	});
	return Boolean(deletedArticleCount);
};

/**
 * M A T H  M E T H O D S
 *
 * Math.floor() static method always rounds down and returns the largest integer less than or equal to a given number.
 *
 * Math.ceil() static method always rounds up and returns the smallest integer greater than or equal to a given number.
 *
 * Math.round() static method returns the value of a number rounded to the nearest integer. If the fractional portion
 * of the argument is greater than 0.5, the argument is rounded to the integer with the next higher absolute value.
 * If it is less than 0.5, the argument is rounded to the integer with the lower absolute value. If the fractional
 * portion is exactly 0.5, the argument is rounded to the next integer in the direction of +∞.
 */

import { FindOptions, Op, Order, WhereOptions } from "sequelize";

import { ArticleAttributes } from "@/db/models";
import type { FilterMapping, FilterRangeMapping, Pagination, SortMapping } from "@/utils/types/query.types";
import type { ResponsePagination } from "@/utils/types/response.types";

export const toPagination = (count: number, pagination?: Pagination): ResponsePagination => {
	const limit = Number(pagination?.limit || 10);
	const page = Number(pagination?.page || 1);
	return {
		limit,
		page,
		totalPages: Math.ceil(count / limit),
		count
	};
};

export const buildPaginationQuery = (pagination?: Pagination): FindOptions<ArticleAttributes> => {
	const limit = Number(pagination?.limit || 10); // Maximum number of records to be retrieved
	const page = Number(pagination?.page || 1); // Starting index for records to be retrieved
	const paginationOptions: FindOptions<ArticleAttributes> = { limit, offset: (page - 1) * limit };
	return paginationOptions;
};

export const buildSortQuery = (sort: SortMapping): Order => {
	const order: Order = [...Object.entries(sort)];
	return order;
};

export const buildFilterQuery = (filters: FilterMapping): WhereOptions<ArticleAttributes> => {
	let where: WhereOptions<ArticleAttributes> = {};
	// TODO: Add dynamic type support for relevant filter properties and values
	const { claps, category, createdAt } = filters;

	if (category) {
		if (typeof category === "string") where.category = { [Op.eq]: category };
		else if (Array.isArray(category)) where.category = { [Op.or]: category };
	}

	if (claps) {
		if (typeof claps === "string") where.claps = { [Op.eq]: claps };
		else if (Array.isArray(claps)) where.claps = { [Op.or]: claps };
		else if (claps) {
			where = {
				...where,
				[Op.and]: {
					claps: {
						...(claps.lt && { [Op.lt]: claps.lt }),
						...(claps.lte && { [Op.lte]: claps.lte }),
						...(claps.gt && { [Op.gt]: claps.gt }),
						...(claps.gte && { [Op.gte]: claps.gte })
					}
					// TODO: Handle [Op.or] operator
				}
			};
		}
	}

	if (createdAt) {
		const { gte = "1970-01-01T00:00:00Z", lt = new Date().toISOString() } = createdAt as FilterRangeMapping;
		const startDate = new Date(gte);
		const endDate = new Date(lt);
		where = {
			...where,
			[Op.and]: {
				createdAt: {
					[Op.lt]: endDate,
					[Op.gte]: startDate
				}
			}
		};
	}
	// TODO: Use [Op.between] shorthand syntax instead
	// where.createdAt = { [Op.between]: [startDate, endDate] };
	return where;
};

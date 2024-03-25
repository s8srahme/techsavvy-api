/**
 * NOTE: - All request query parameter values are parsed as strings. You have to convert all numbers, booleans and Date
 * 				 strings into their primitive counterparts if needed.
 * 			 - qs by default URI decodes input
 */

import { Request } from "express";
import qs from "qs";

import { FilterMappingValue, FilterOperator, SearchQuery } from "../types/query.types";
import type {
	FilterMapping,
	FilterRangeMapping,
	Pagination,
	ParameterMapping,
	SortMapping,
	SortOrder
} from "../types/query.types";

const SORT_ORDERS: SortOrder[] = ["asc", "desc"];

const isSortOrderFound = (sortParamValue: string) => {
	return SORT_ORDERS.some((order) => sortParamValue.includes(order));
};

const getSortValueMapping = (sortParamValue: string): Record<string, SortOrder> => {
	const [field, order = "asc"] = sortParamValue.split(":");
	return { [field]: order as SortOrder };
};

export const parseQueryString = (queryString: string): ParameterMapping => {
	const parsedParams = qs.parse(queryString, { comma: true, ignoreQueryPrefix: true });
	const paramsMapping: ParameterMapping = {};

	Object.keys(parsedParams).forEach((paramKey) => {
		if (paramKey === "sort") {
			/**
			 * Sorting allows you to order the results by any field, in ascending or descending order. To sort multiple
			 * columns, comma-separate each `field:order` pair and put it in one sort parameter. This syntax will be
			 * also used for a single field.
			 *
			 * e.g. ?sort=first_name:asc,age:desc
			 */
			const sortParamValues = (
				typeof parsedParams[paramKey] === "string" ? [parsedParams[paramKey]] : parsedParams[paramKey]
			) as string[];
			let sort: SortMapping = {};

			if (sortParamValues && Array.isArray(sortParamValues) && isSortOrderFound(sortParamValues[0])) {
				sortParamValues.forEach((paramValue) => {
					sort = { ...sort, ...getSortValueMapping(paramValue) };
				});
			}

			paramsMapping.sort = sort;
		} else if (paramKey === "q") {
			/**
			 * Search query parameter adds full text search to your API.
			 *
			 * e.g. ?q=There is not really a set standard for creating these types of endpoints
			 *
			 * TODO: Handle space characters for search text
			 */
			const queryParamValue = parsedParams[paramKey] as string;
			const search = { ...paramsMapping.search } as SearchQuery;

			search.query = queryParamValue;
			paramsMapping.search = search;
		} else if (paramKey === "page" || paramKey === "limit") {
			/**
			 * Pagination splits the records into equal chunks by using page and limit parameters, such that page number
			 * indicates chunk index whose records are to be retrieved and each page containing maximum limit number of
			 * records.
			 *
			 * e.g. ?page=3&limit=20
			 */
			const paginationParamValue = parsedParams[paramKey];
			const pagination = { ...paramsMapping.pagination } as Pagination;

			pagination[paramKey] = paginationParamValue as string;
			paramsMapping.pagination = pagination;
		} else if (paramKey === "start" || paramKey === "end") {
			/**
			 * If you need a range between two dates, use start and end filters.
			 *
			 * e.g. ?start=2019-02-05T00:00:00&end=2019-02-05T23:59:59 (date, range)
			 */
			const filterParamValue = parsedParams[paramKey];
			const filter = { ...paramsMapping.filter } as FilterMapping;
			const createdAt = (filter.createdAt || {}) as FilterRangeMapping;
			const filterRangeKey = (paramKey === "start" ? "gte" : "lt") as FilterOperator;

			createdAt[filterRangeKey] = filterParamValue as string;
			filter.createdAt = createdAt;
			paramsMapping.filter = filter;
		} else {
			/**
			 * Filters can be composed of up to three components, namely field name, value and optional operator (lt:,
			 * lte:, gt:, gte: and more).
			 *
			 * e.g. ?first_name=a (exact)
			 * 			?first_name=a,b (exact, multiple)
			 * 			?price[gte]=10&price[lte]=100 (number, range)
			 */
			const filterParamValue = parsedParams[paramKey];
			const filter = { ...paramsMapping.filter } as FilterMapping;

			filter[paramKey] = filterParamValue as FilterMappingValue;
			paramsMapping.filter = filter;
		}
	});

	return paramsMapping;
};

export const getQueryString = (req: Request) => {
	const queryString = new URL(req.originalUrl, `http://${req.headers.host}`);
	return queryString.search;
};

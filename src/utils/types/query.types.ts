export type SortOrder = "asc" | "desc";
export type SortMapping = Record<string, SortOrder>;

export type Pagination = { limit: string; page: string };

export type SearchQuery = { query: string };

export type FilterOperator = "lt" | "lte" | "gt" | "gte"; // TODO: Sync with Op type from Sequelize
export type FilterRangeMapping = Record<FilterOperator, string>;
export type FilterMappingValue = string | string[] | FilterRangeMapping;
export type FilterMapping = Record<string, FilterMappingValue>;

export type ParameterMapping = {
	sort?: SortMapping;
	pagination?: Pagination;
	search?: SearchQuery;
	filter?: FilterMapping;
};

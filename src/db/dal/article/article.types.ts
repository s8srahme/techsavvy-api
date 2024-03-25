import { ArticleCategory } from "@/db/models/article/Article.types";

export type FilterArticleParams = {
	// isDeleted?: boolean;
	// includeDeleted?: boolean;
	claps?: number;
	category?: ArticleCategory;
	createdAt?: Date;
};
export type SortArticleParams = FilterArticleParams;

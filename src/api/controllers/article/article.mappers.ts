/**
 * Mappers transform results into desired JSON format (for transporting data from server to client).
 */

import type { ArticleResultAttributes } from "@/db/models";

import type { Article } from "./article.types";
import { toAuthor } from "../author/author.mappers";
import { Author } from "../author/author.types";

export const toArticle = (article: ArticleResultAttributes): Article => {
	const transformedArticle: Article = {
		id: article.id,
		title: article.title,
		description: article.description,
		image: article.image,
		alt: article.alt,
		slug: article.slug,
		claps: article.claps,
		category: article.category,
		createdAt: article.createdAt,
		updatedAt: article.updatedAt
	};

	if (article.Author) {
		// Tidy up the raw Author data before sending it to the client
		const transformedAuthor: Author = toAuthor(article.Author);
		transformedArticle.author = transformedAuthor;
	} else {
		// TODO: Replace authorId with Author object on POST response controller
		transformedArticle.authorId = article.authorId;
	}

	return transformedArticle;
};

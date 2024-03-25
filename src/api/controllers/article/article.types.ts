/**
 * To support typing the parameters and results between routes and controllers, you can add data transfer objects
 * (DTOs).
 */

import { ArticleAttributes } from "@/db/models/article/Article.types";

import type { Author } from "../author/author.types";

// M A P P E R  R E T U R N  T Y P E S

export type Article = Omit<ArticleAttributes, "deletedAt"> & { author?: Author };

// C O N T R O L L E R  P A R A M E T E R  T Y P E S

/* eslint-disable prettier/prettier */
export type CreateArticleParams = Omit<
ArticleAttributes,
"id" | "slug" | "createdAt" | "updatedAt" | "deletedAt"
>;
/* eslint-enable prettier/prettier */
export type UpdateArticleParams = Partial<CreateArticleParams>;

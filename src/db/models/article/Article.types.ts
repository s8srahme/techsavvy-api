import { Optional } from "sequelize";

import { AuthorResultAttributes } from "../author/Author.types";

export type ArticleAttributes = {
	id: string;
	title: string;
	description: string;
	image?: string; // Optional properties automatically have undefined ADDED to their types
	alt: string; // TODO: Combine image URL and alt text into one object
	slug: string;
	claps: number;
	category: ArticleCategory;
	authorId?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
};

export type ArticleCreationAttributes = Optional<ArticleAttributes, "id" | "slug" | "claps">;
export type ArticleResultAttributes = Required<ArticleAttributes> & { Author?: AuthorResultAttributes };

export enum ArticleCategory {
	SOFTWARE_AND_APPS = "software-and-apps",
	AI = "ai",
	EV = "ev",
	CRYPTO = "crypto",
	MOVIES_AND_SHOWS = "movies-and-shows",
	GAMING = "gaming",
	SPACE = "space",
	WORK_AND_CAREER = "work-and-career",
	ELECTRONICS = "electronics"
}

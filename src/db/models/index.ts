import { Article } from "./article/Article.model";
import type { ArticleAttributes, ArticleCreationAttributes, ArticleResultAttributes } from "./article/Article.types";
import { Author } from "./author/Author.model";
import type { AuthorAttributes, AuthorCreationAttributes, AuthorResultAttributes } from "./author/Author.types";

// T Y P E S

export type {
	ArticleAttributes,
	ArticleCreationAttributes,
	ArticleResultAttributes,
	AuthorAttributes,
	AuthorCreationAttributes,
	AuthorResultAttributes
};

// M O D E L S

export { Article, Author };

// One-To-Many relationships

Author.hasMany(Article, {
	foreignKey: "authorId"
});
Article.belongsTo(Author, {
	foreignKey: "authorId"
});

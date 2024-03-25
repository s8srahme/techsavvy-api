/**
 * A model is an abstraction that represents a table in your database.
 */

import { DataTypes, Model } from "sequelize";

import type { ArticleAttributes, ArticleCategory, ArticleCreationAttributes } from "./Article.types";
import { sequelizeConnection } from "../../config.db";

class Article extends Model<ArticleAttributes, ArticleCreationAttributes> {
	declare id: string;

	declare title: string;

	declare description: string;

	declare image: string;

	declare alt: string;

	declare slug: string;

	declare claps: number;

	declare category: ArticleCategory;

	declare readonly authorId: string;

	declare readonly createdAt: Date;

	declare readonly updatedAt: Date;

	declare readonly deletedAt: Date;
}

Article.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		image: {
			type: DataTypes.TEXT
			// allowNull defaults to true
		},
		alt: {
			type: DataTypes.STRING,
			allowNull: false
		},
		claps: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		category: {
			// TODO: Validate category using ArticleCategory type
			type: DataTypes.STRING,
			allowNull: false
		}
		/**
		 * Foreign key authorId of type UUID (refers to primary key of Authors) will be added to Articles table
		 * automatically.
		 */
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection
		// paranoid: true
	}
);

export { Article };

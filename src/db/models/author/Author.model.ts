import { DataTypes, Model } from "sequelize";

import { AuthorAttributes, AuthorCreationAttributes, AuthorPermission, AuthorRole } from "./Author.types";
import { sequelizeConnection } from "../../config.db";

class Author extends Model<AuthorAttributes, AuthorCreationAttributes> {
	declare id: string;

	declare lastName: string;

	declare firstName: string;

	declare email: string;

	declare avatar: string;

	declare roles: AuthorRole[];

	declare permissions: AuthorPermission[];

	declare bornAt: Date;

	declare readonly createdAt: Date;

	declare readonly updatedAt: Date;

	declare readonly deletedAt: Date;
}

Author.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		avatar: {
			type: DataTypes.TEXT
			// allowNull defaults to true
		},
		roles: {
			type: DataTypes.ARRAY(DataTypes.STRING), // TODO: Add AuthorRole type instead of string
			allowNull: false
		},
		permissions: {
			type: DataTypes.ARRAY(DataTypes.STRING), // TODO: Add AuthorPermission type instead of string
			allowNull: false
		},
		bornAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection
		// paranoid: true
	}
);

export { Author };

import { Optional } from "sequelize";

// M O D E L  T Y P E S

export type AuthorAttributes = {
	id: string;
	lastName: string;
	firstName: string;
	email: string;
	avatar?: string;
	roles: AuthorRole[];
	permissions: AuthorPermission[];
	bornAt: Date;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
};
export type AuthorCreationAttributes = Optional<AuthorAttributes, "id">;
export type AuthorResultAttributes = Required<AuthorAttributes>;

export type AuthorPermission = "create" | "update" | "delete" | "analyze";
export type AuthorRole = "admin" | "editor" | "author";

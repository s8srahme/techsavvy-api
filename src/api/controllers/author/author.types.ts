import { AuthorAttributes, AuthorCreationAttributes } from "@/db/models/author/Author.types";

// M A P P E R  R E T U R N  T Y P E S

export type AuthorName = { firstName: string; lastName: string };
export type Author = Omit<AuthorAttributes, "deletedAt" | "firstName" | "lastName"> & {
	name: AuthorName;
};

// C O N T R O L L E R  P A R A M E T E R  T Y P E S

export type CreateAuthorParams = Omit<AuthorCreationAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt">;
export type UpdateAuthorParams = Partial<CreateAuthorParams>;

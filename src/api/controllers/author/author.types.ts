import { AuthorAttributes } from "@/db/models/author/Author.types";

// M A P P E R  R E T U R N  T Y P E S

export type AuthorName = { firstName: string; lastName: string };
export type Author = Omit<AuthorAttributes, "deletedAt" | "firstName" | "lastName"> & {
	name: AuthorName;
};

// C O N T R O L L E R  P A R A M E T E R  T Y P E S

/* eslint-disable prettier/prettier */
export type CreateAuthorParams = Omit<
AuthorAttributes,
"id" | "createdAt" | "updatedAt" | "deletedAt"
>;
/* eslint-enable prettier/prettier */
export type UpdateAuthorParams = Partial<CreateAuthorParams>;

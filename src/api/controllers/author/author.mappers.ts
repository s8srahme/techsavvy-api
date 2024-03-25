import type { AuthorResultAttributes } from "@/db/models";

import type { Author } from "./author.types";

export const toAuthor = (author: AuthorResultAttributes): Author => {
	return {
		id: author.id,
		name: { firstName: author.firstName, lastName: author.lastName },
		email: author.email,
		avatar: author.avatar,
		roles: author.roles,
		permissions: author.permissions,
		bornAt: author.bornAt,
		createdAt: author.createdAt,
		updatedAt: author.updatedAt
	};
};

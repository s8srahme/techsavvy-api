import { create, deleteById, getAll, getById, update } from "@/db/dal/author/author.dal";
import { FilterAuthorParams } from "@/db/dal/author/author.types";
import type { AuthorCreationAttributes, AuthorResultAttributes } from "@/db/models";

export const createOne = (payload: AuthorCreationAttributes): Promise<AuthorResultAttributes> => {
	return create(payload);
};

export const updateOne = (id: string, payload: Partial<AuthorCreationAttributes>): Promise<AuthorResultAttributes> => {
	return update(id, payload);
};

export const retrieveOne = (id: string): Promise<AuthorResultAttributes> => {
	return getById(id);
};

export const retrieveMany = (filters: FilterAuthorParams): Promise<AuthorResultAttributes[]> => {
	return getAll(filters);
};

export const deleteOne = (id: string): Promise<boolean> => {
	return deleteById(id);
};

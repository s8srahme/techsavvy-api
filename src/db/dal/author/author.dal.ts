// import { Op } from "sequelize";

import type { FilterAuthorParams } from "./author.types";
import { AuthorCreationAttributes, Author as AuthorModel, AuthorResultAttributes } from "../../models";

export const create = async (payload: AuthorCreationAttributes): Promise<AuthorResultAttributes> => {
	const author = await AuthorModel.create(payload);
	return author;
};

export const update = async (
	id: string,
	payload: Partial<AuthorCreationAttributes>
): Promise<AuthorResultAttributes> => {
	const author = await AuthorModel.findByPk(id);
	if (!author) {
		// TODO: Throw custom error
		throw new Error("Author not found");
	}
	const updatedAuthor = await (author as AuthorModel).update(payload);
	return updatedAuthor;
};

export const getById = async (id: string): Promise<AuthorResultAttributes> => {
	const author = await AuthorModel.findByPk(id);
	if (!author) {
		// TODO: Throw custom error
		throw new Error("Author not found");
	}
	return author;
};

export const getAll = async (filters?: FilterAuthorParams): Promise<AuthorResultAttributes[]> => {
	return AuthorModel.findAll({
		// where: {
		// 	...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
		// },
		...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
	});
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedArticleCount = await AuthorModel.destroy({
		where: { id }
	});
	return Boolean(deletedArticleCount);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAuthor = void 0;
const toAuthor = (author) => {
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
exports.toAuthor = toAuthor;
//# sourceMappingURL=author.mappers.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const voca_1 = require("voca");
const number_helpers_1 = require("./number.helpers");
const slugify = (text) => {
    const slug = (0, voca_1.slugify)(text);
    const uid = (0, number_helpers_1.getRandomInteger)(1, 10000);
    return `${slug}-${uid}`;
};
exports.slugify = slugify;
//# sourceMappingURL=slugify.helpers.js.map
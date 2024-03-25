"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInteger = void 0;
const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getRandomInteger = getRandomInteger;
//# sourceMappingURL=number.helpers.js.map
import { slugify as _slugify } from "voca";

import { getRandomInteger } from "./number.helpers";

export const slugify = (text: string) => {
	const slug = _slugify(text);
	// TODO: Use alphanumeric string UID that is guaranteed to be unique among all identifiers used for the specific
	// 			 purpose
	const uid = getRandomInteger(1, 10000);
	return `${slug}-${uid}`;
};

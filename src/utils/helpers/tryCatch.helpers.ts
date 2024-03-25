import { NextFunction, Request } from "express";

import { ResponsePayload, SuccessResponse, TypedResponse } from "../types/response.types";
import type { ControllerCallback, ReturnParams } from "../types/tryCatch.types";

export const tryCatch = (controller: ControllerCallback) => {
	return async (
		req: Request,
		res: TypedResponse<SuccessResponse<ResponsePayload>>,
		next: NextFunction
	): ReturnParams => {
		try {
			return await controller(req, res);
		} catch (err: unknown) {
			/**
			 * Instead of calling res.json() in a middleware or controller for error handling, use next() with the error
			 * object. Then handle all errors within an error-handling middleware function.
			 */
			return next(err); // Passes control to next middleware function in the stack (i.e. error handler)
		}
	};
};

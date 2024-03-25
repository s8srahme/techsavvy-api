/**
 * Middleware
 *
 * Middleware functions are functions that have access to request object (req), response object (res), and next
 * middleware function in the application's request-response cycle. These functions can perform the following tasks:
 * 	- Execute any code
 * 	- Make changes to request and response objects
 * 	- End request-response cycle
 * 	- Call next middleware function in the stack
 *
 * If the current middleware function does not end the request-response cycle, it must call next() to pass control to
 * the next middleware function. Otherwise, the request will be left hanging.
 *
 * Error Handling
 *
 * It’s important to ensure that Express catches all errors that occur while running route handlers and middleware.
 * Errors that occur in synchronous code inside route handlers and middleware require no extra work. If synchronous
 * code throws an error, then Express will catch and process it. For example:
 */

import { NextFunction, Request } from "express";

import { ErrorResponse, ResponseStatus, TypedResponse } from "@/utils/types/response.types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: TypedResponse<ErrorResponse>, _next: NextFunction) => {
	console.error("[server]", err.message);
	return res.status(500).json({ status: ResponseStatus.ERROR, message: err.message });
};

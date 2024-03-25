import { Request } from "express";

import { ResponsePayload, SuccessResponse, TypedResponse } from "./response.types";

export type ControllerCallback = (
	req: Request,
	res: TypedResponse<SuccessResponse<ResponsePayload>>
) => Promise<TypedResponse<SuccessResponse<ResponsePayload>>>;
export type ReturnParams = Promise<TypedResponse<SuccessResponse<ResponsePayload>> | void>;

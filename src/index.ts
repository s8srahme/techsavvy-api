import { config } from "dotenv";
/**
 * Execute dotenv.config() at the very beginning of your entry file (before any other code runs), so that dotenv loads
 * environment variables from .env.* file and injects it into process.env recursively (including imported modules). You
 * can specify a custom path if your file containing environment variables is located elsewhere (sets in left to right
 * precedence).
 */
const NODE_ENV = process.env.NODE_ENV || "development";
config({ path: `.env.${NODE_ENV}` });

/* eslint-disable import/first */
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { router } from "@/api/routes";
import { dbInit } from "@/db/init.db";
import { errorHandler } from "@/middleware/errorHandler.middleware";
/* eslint-enable import/first */

const PORT = process.env.PORT || 3000;
const app: Express = express();

const serverInit = async () => {
	await dbInit();

	app.use(morgan("combined"));
	/* Body parsing middleware */
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());
	app.use(helmet());

	app.get("/", async (_req: Request, res: Response): Promise<Response> => {
		return res
			.status(200)
			.send({ message: `Welcome to Techsavvy API! Endpoints are available at http://localhost:${PORT}/api/v2.` });
	});
	app.use("/api/v2", router);
	app.use(errorHandler);
};

(async () => {
	try {
		await serverInit();
		app.listen(PORT, () => {
			console.log(`[server] ${NODE_ENV} server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(`[server] ${error.message}`);
	}
})();

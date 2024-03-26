/**
 * express.Router class is used to create router instance, which is a complete middleware and routing system (contains
 * route handlers) - often referred to as a mini-app.
 *
 * Each *.routes.ts creates a router as a module, loads a middleware function in it, defines some routes and finally
 * mounts the router module on a path in the main app.
 *
 * Routes forward supported requests (and any information encoded in request URLs) to the appropriate controller
 * functions.
 */

import { Router } from "express";

import * as ArticleController from "../controllers/article/article.controller";

const articlesRouter = Router();

/* Middleware specific to articles router */
// const timeLog = (req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// }
// articlesRouter.use(timeLog)

articlesRouter.post("/", ArticleController.createOne);
articlesRouter.post("/create_many", ArticleController.createMany);
articlesRouter.get("/", ArticleController.retrieveMany);
articlesRouter.get("/:id", ArticleController.retrieveOne);
articlesRouter.put("/:id", ArticleController.updateOne);
articlesRouter.delete("/:id", ArticleController.deleteOne);

export { articlesRouter };

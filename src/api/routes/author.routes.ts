import { Router } from "express";

import * as AuthorController from "../controllers/author/author.controller";

const authorsRouter = Router();

authorsRouter.post("/", AuthorController.createOne);
authorsRouter.post("/create_many", AuthorController.createMany);
authorsRouter.get("/", AuthorController.retrieveMany);
authorsRouter.get("/:id", AuthorController.retrieveOne);
authorsRouter.put("/:id", AuthorController.updateOne);
authorsRouter.delete("/:id", AuthorController.deleteOne);

export { authorsRouter };

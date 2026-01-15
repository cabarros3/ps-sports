import { Router } from "express";
import GuardianController from "../controllers/GuardianController.ts";

const guardiansRoutes = Router();

guardiansRoutes.post("/", GuardianController.create);
guardiansRoutes.get("/:id", GuardianController.show);

export default guardiansRoutes;
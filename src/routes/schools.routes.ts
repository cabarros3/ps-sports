import express from "express";
import { SchoolsController } from "../controllers/SchoolsController.ts";

const routerSchools = express.Router();


routerSchools.post("/", SchoolsController.criar);
routerSchools.get("/", SchoolsController.listar);
routerSchools.get("/:id", SchoolsController.buscarPorId);
routerSchools.put("/:id", SchoolsController.atualizar);
routerSchools.delete("/:id", SchoolsController.deletar);


export default routerSchools;

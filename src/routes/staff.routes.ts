import express from "express";
import { StaffsController } from "../controllers/StaffsController.ts";

const routerStaffs = express.Router();

routerStaffs.post("/", StaffsController.criar);
routerStaffs.get("/", StaffsController.listar);
routerStaffs.get("/:id", StaffsController.buscarPorId);
routerStaffs.put("/:id", StaffsController.atualizar);
routerStaffs.delete("/:id", StaffsController.deletar);

export default routerStaffs;

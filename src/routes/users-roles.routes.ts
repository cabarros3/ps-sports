import express from "express";
import { UsersRolesController } from "../controllers/Users_RolesController.ts";

const routerUsersRoles = express.Router();

routerUsersRoles.get("/", UsersRolesController.listar);
routerUsersRoles.get("/:id", UsersRolesController.buscarPorId);
routerUsersRoles.post("/", UsersRolesController.criar);
routerUsersRoles.delete("/:id", UsersRolesController.deletar);

export default routerUsersRoles;

import express from "express";
import { RolesController } from "../controllers/RolesController.ts";
const routerRoles = express.Router();
/**
* @swagger
* components:
*schemas:
*Role:
*type: object
*properties:
*
id:
*type: integer
*description: ID único da role
*
name:
*type: string
*description: Nome da role/função
*
description:
*type: string
*description: Descrição detalhada da role
*
created_at:
*type: string
*format: date-time
*description: Data de criação do registro
*
updated_at:
*type: string
*format: date-time
*description: Data da última atualização
*example:
*id: 1
*name: "admin"
*description: "Administrador do sistema com acesso total"
*created_at: "2024-01-15T10:30:00Z"
*updated_at: "2024-01-15T10:30:00Z"
*/
routerRoles.get("/", RolesController.listar);
routerRoles.get("/:id", RolesController.buscarPorId);
routerRoles.post("/", RolesController.criar);
routerRoles.put("/:id", RolesController.atualizar);
routerRoles.delete("/:id", RolesController.deletar);
export default routerRoles;

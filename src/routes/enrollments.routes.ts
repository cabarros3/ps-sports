import express from "express";
import { EnrollmentsController } from "../controllers/EnrollmentsController.ts";
const routerEnrollments = express.Router();
/**
* @swagger
* components:
*
*
schemas:
Enrollment:
*type: object
*properties:
*
id:
*type: integer
*description: ID único da matrícula
*
entry_date:
*type: string
*format: date-time*
*
description: Data de entrada/matrícula
status:
*type: string
*enum: [Ativo, Inativo, Pendente, Cancelado]
*description: Status atual da matrícula
*
*
*
*
player_id:
type: integer
description: ID do jogador/aluno matriculado
class_id:
*type: integer
*description: ID da turma/classe
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
*entry_date: "2024-01-15T10:30:00Z"
*status: "Ativo"
*player_id: 42
*class_id: 7
*created_at: "2024-01-15T10:30:00Z"
*updated_at: "2024-01-15T10:30:00Z"
*/
// Rotas
routerEnrollments.get("/", EnrollmentsController.listar);
routerEnrollments.get("/:id", EnrollmentsController.buscarPorId);
routerEnrollments.post("/", EnrollmentsController.criar);
routerEnrollments.put("/:id", EnrollmentsController.atualizar);
routerEnrollments.delete("/:id", EnrollmentsController.deletar);
export default routerEnrollments;

import { Router } from "express";
import AttendancesControllers from "../controllers/AttendancesControllers.ts";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da presença (auto-incrementado)
 *         class_date:
 *           type: string
 *           format: date-time
 *           description: Data e hora da aula
 *         status:
 *           type: integer
 *           description: Status da presença (0 = ausente, 1 = presente)
 *         enrollment_id:
 *           type: integer
 *           description: ID da matrícula associada
 *       example:
 *         id: 1
 *         class_date: "2026-01-15T14:30:00Z"
 *         status: 1
 *         enrollment_id: 5
 *
 *     AttendanceInput:
 *       type: object
 *       required:
 *         - class_date
 *         - status
 *         - enrollment_id
 *       properties:
 *         class_date:
 *           type: string
 *           format: date-time
 *           description: Data e hora da aula
 *         status:
 *           type: integer
 *           description: Status da presença (0 = ausente, 1 = presente)
 *           enum: [0, 1]
 *         enrollment_id:
 *           type: integer
 *           description: ID da matrícula
 *       example:
 *         class_date: "2026-01-16T10:00:00Z"
 *         status: 1
 *         enrollment_id: 8
 *
 *     AttendanceUpdate:
 *       type: object
 *       properties:
 *         class_date:
 *           type: string
 *           format: date-time
 *         status:
 *           type: integer
 *           enum: [0, 1]
 *         enrollment_id:
 *           type: integer
 *       example:
 *         class_date: "2026-01-16T10:00:00Z"
 *         status: 0
 *
 *     AttendanceError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *         error:
 *           type: object
 *           description: Detalhes do erro
 *       example:
 *         message: "Presença não encontrada"
 *
 *   tags:
 *     - name: Attendances
 *       description: Gerenciamento de presenças em aulas
 */

/**
 * @swagger
 * /attendances:
 *   get:
 *     summary: Lista todas as presenças
 *     description: Retorna uma lista completa com todos os registros de presença cadastrados
 *     tags: [Attendances]
 *     responses:
 *       200:
 *         description: Lista de presenças retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 *       500:
 *         description: Erro ao listar presenças
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Erro ao listar presenças"
 *               error: {}
 */
router.get("/", AttendancesControllers.listar);

/**
 * @swagger
 * /attendances:
 *   post:
 *     summary: Cria um novo registro de presença
 *     description: Registra a presença ou ausência de um aluno em uma aula específica. O ID é gerado automaticamente
 *     tags: [Attendances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceInput'
 *     responses:
 *       201:
 *         description: Presença criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       500:
 *         description: Erro ao criar presença
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Erro ao criar presença"
 *               error: {}
 */
router.post("/", AttendancesControllers.criar);

/**
 * @swagger
 * /attendances/{id}:
 *   get:
 *     summary: Busca uma presença por ID
 *     description: Retorna os dados de um registro de presença específico através do seu ID
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do registro de presença
 *         example: 1
 *     responses:
 *       200:
 *         description: Presença encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Presença não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Presença não encontrada"
 *       500:
 *         description: Erro ao buscar presença
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Erro ao buscar presença"
 *               error: {}
 */
router.get("/:id", AttendancesControllers.buscarPorId);

/**
 * @swagger
 * /attendances/{id}:
 *   put:
 *     summary: Atualiza um registro de presença
 *     description: Atualiza os dados de um registro de presença existente
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do registro de presença
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceUpdate'
 *     responses:
 *       200:
 *         description: Presença atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Presença não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Presença não encontrada"
 *       500:
 *         description: Erro ao atualizar presença
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Erro ao atualizar presença"
 *               error: {}
 */
router.put("/:id", AttendancesControllers.atualizar);

/**
 * @swagger
 * /attendances/{id}:
 *   delete:
 *     summary: Remove um registro de presença
 *     description: Realiza a exclusão permanente de um registro de presença do sistema
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do registro de presença a ser removido
 *         example: 1
 *     responses:
 *       204:
 *         description: Presença removida com sucesso (sem conteúdo)
 *       404:
 *         description: Presença não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Presença não encontrada"
 *       500:
 *         description: Erro ao deletar presença
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceError'
 *             example:
 *               message: "Erro ao deletar presença"
 *               error: {}
 */
router.delete("/:id", AttendancesControllers.deletar);

export default router;

import express from "express";
import { EnrollmentsController } from "../controllers/EnrollmentsController.ts";

const routesEnrollments = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: 5
 *           description: Número de ID unico da matricula
 *         entry_date:
 *           type: string
 *           format: date-time
 *           description: Data de entrada/matrícula
 *         status:
 *           type: string
 *           enum: [Ativo, Inativo, Pendente, Cancelado]
 *           description: Status atual da matrícula
 *         player_id:
 *           type: integer
 *           format: uuid
 *           description: ID do jogador/aluno matriculado
 *         class_id:
 *           type: integer
 *           format: uuid
 *           description: ID da turma/classe
 *       example:
 *         id: 5
 *         entry_date: "2026-01-15T10:30:00Z"
 *         status: "Ativo"
 *         player_id: 3
 *         class_id: 8
 *
 *     EnrollmentInput:
 *       type: object
 *       required:
 *         - player_id
 *         - class_id
 *       properties:
 *         player_id:
 *           type: integer
 *           description: ID do jogador (obrigatório, referência a tabela players)
 *         class_id:
 *           type: integer
 *           description: ID da turma (obrigatório, referência a tabela classes)
 *         status:
 *           type: string
 *           enum: [Ativo, Inativo, Pendente, Cancelado]
 *           description: Status da matrícula (opcional, padrão é Pendente)
 *       example:
 *         player_id: 8
 *         class_id: 5
 *         status: "Ativo"
 *
 *     EnrollmentUpdate:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [Ativo, Inativo, Pendente, Cancelado]
 *           description: Novo status da matrícula
 *       example:
 *         status: "Cancelado"
 *
 *     EnrollmentError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *         mensagem:
 *           type: string
 *           description: Mensagem de erro alternativa
 *       example:
 *         error: "Matrícula não encontrada"
 *
 *     EnrollmentSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Matrícula removida com sucesso"
 *
 *     EnrollmentUpdateResponse:
 *       type: object
 *       properties:
 *         enrollment:
 *           $ref: '#/components/schemas/Enrollment'
 *         mensagem:
 *           type: string
 *       example:
 *         enrollment:
 *           id: 5
 *           entry_date: "2026-01-15T10:30:00Z"
 *           status: "Cancelado"
 *           player_id: 3
 *           class_id: 8
 *         mensagem: "Matrícula atualizada com sucesso"
 *
 *   tags:
 *     - name: Enrollments
 *       description: Gerenciamento de matrículas de alunos em turmas
 */

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Lista todas as matrículas
 *     description: Retorna uma lista completa com todas as matrículas cadastradas no sistema
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: Lista de matrículas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enrollment'
 *       500:
 *         description: Erro ao listar matrículas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             example:
 *               error: "Erro ao buscar matrículas"
 */
routesEnrollments.get("/", EnrollmentsController.listar);

/**
 * @swagger
 * /enrollments/{id}:
 *   get:
 *     summary: Busca uma matrícula por ID
 *     description: Retorna os dados completos de uma matrícula específica através do seu UUID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da matrícula
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Matrícula encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             example:
 *               error: "Matrícula não encontrada"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             example:
 *               message: "ID fornecido é inválido ou erro no servidor"
 *               error: "Detalhes do erro"
 */
routesEnrollments.get("/:id", EnrollmentsController.buscarPorId);

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Cria uma nova matrícula
 *     description: Cadastra uma nova matrícula associando um jogador a uma turma. A data de entrada é gerada automaticamente
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollmentInput'
 *     responses:
 *       201:
 *         description: Matrícula criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             examples:
 *               camposObrigatorios:
 *                 value:
 *                   message: "Os campos player_id e class_id são obrigatórios"
 *               erroValidacao:
 *                 value:
 *                   message: "Não foi possível criar a matrícula"
 *                   error: "Detalhes do erro de validação"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 */
routesEnrollments.post("/", EnrollmentsController.criar);

/**
 * @swagger
 * /enrollments/{id}:
 *   put:
 *     summary: Atualiza uma matrícula existente
 *     description: Atualiza o status de uma matrícula. Se não informado, mantém o status atual
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da matrícula
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollmentUpdate'
 *     responses:
 *       200:
 *         description: Matrícula atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentUpdateResponse'
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             example:
 *               error: "Matrícula não encontrada para atualização"
 *       500:
 *         description: Erro ao atualizar matrícula
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             example:
 *               error: "Erro ao atualizar a matrícula"
 *               message: "Detalhes do erro"
 */
routesEnrollments.put("/:id", EnrollmentsController.atualizar);

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Remove uma matrícula
 *     description: Realiza a exclusão permanente de uma matrícula do sistema através do UUID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da matrícula a ser removida
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Matrícula removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentSuccessMessage'
 *             example:
 *               mensagem: "Matrícula removida com sucesso"
 *       404:
 *         description: Matrícula não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             example:
 *               error: "Matrícula não encontrada"
 *       500:
 *         description: Erro ao deletar matrícula
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentError'
 *             example:
 *               mensagem: "Erro ao deletar a matrícula"
 *               error: "Detalhes do erro"
 */
routesEnrollments.delete("/:id", EnrollmentsController.deletar);

export default routesEnrollments;

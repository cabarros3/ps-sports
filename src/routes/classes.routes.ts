import express from "express";
import { ClassesController } from "../controllers/ClassesController.ts";

const routerClasses = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da turma (auto-incrementado)
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Nome da turma
 *         weekdays:
 *           type: string
 *           maxLength: 100
 *           description: Dias da semana em que a turma acontece
 *         schedule:
 *           type: string
 *           format: date-time
 *           description: Data e horário da aula
 *         status:
 *           type: string
 *           enum: [Novo, Em contato, Agendado, Convertido, Desqualificado]
 *           description: Status atual da turma
 *         modality_id:
 *           type: integer
 *           description: ID da modalidade esportiva
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: ID da categoria
 *         trainer_id:
 *           type: integer
 *           description: ID do treinador responsável
 *       example:
 *         id: 1
 *         name: "Turma Futebol Infantil A"
 *         weekdays: "Segunda, Quarta, Sexta"
 *         schedule: "2026-01-15T14:30:00Z"
 *         status: "Agendado"
 *         modality_id: 5
 *         category_id: "550e8400-e29b-41d4-a716-446655440000"
 *         trainer_id: 12
 *
 *     ClassInput:
 *       type: object
 *       required:
 *         - name
 *         - weekdays
 *         - schedule
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Nome da turma
 *           minLength: 3
 *         weekdays:
 *           type: string
 *           maxLength: 100
 *           description: Dias da semana (ex. Segunda, Quarta, Sexta)
 *         schedule:
 *           type: string
 *           format: date-time
 *           description: Data e horário da aula
 *         status:
 *           type: string
 *           enum: [Novo, Em contato, Agendado, Convertido, Desqualificado]
 *           default: Novo
 *           description: Status inicial da turma
 *         modality_id:
 *           type: integer
 *           description: ID da modalidade (opcional)
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: ID da categoria (opcional)
 *         trainer_id:
 *           type: integer
 *           description: ID do treinador (opcional)
 *       example:
 *         name: "Turma Basquete Sub-15"
 *         weekdays: "Terça, Quinta"
 *         schedule: "2026-01-14T16:00:00Z"
 *         status: "Novo"
 *         modality_id: 3
 *         category_id: "660e8400-e29b-41d4-a716-446655440001"
 *         trainer_id: 8
 *
 *     ClassUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 100
 *           minLength: 3
 *         weekdays:
 *           type: string
 *           maxLength: 100
 *         schedule:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [Novo, Em contato, Agendado, Convertido, Desqualificado]
 *         modality_id:
 *           type: integer
 *         category_id:
 *           type: string
 *           format: uuid
 *         trainer_id:
 *           type: integer
 *       example:
 *         name: "Turma Basquete Sub-15 Avançado"
 *         weekdays: "Terça, Quinta, Sábado"
 *         schedule: "2026-01-20T17:00:00Z"
 *         status: "Convertido"
 *         trainer_id: 10
 *
 *     ClassError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *       example:
 *         error: "Classe não encontrada"
 *
 *     ClassSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Classe removida com sucesso"
 *
 *     ClassUpdateResponse:
 *       type: object
 *       properties:
 *         classId:
 *           $ref: '#/components/schemas/Class'
 *         mensagem:
 *           type: string
 *       example:
 *         classId:
 *           id: 1
 *           name: "Turma Futebol Infantil A"
 *           weekdays: "Segunda, Quarta, Sexta"
 *           schedule: "2026-01-15T14:30:00Z"
 *           status: "Agendado"
 *         mensagem: "Classe atualizada com sucesso"
 *
 *   tags:
 *     - name: Classes
 *       description: Gerenciamento de turmas e aulas
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Lista todas as turmas
 *     description: Retorna uma lista completa com todas as turmas cadastradas no sistema
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             example:
 *               error: "Erro ao buscar turmas"
 */
routerClasses.get("/", ClassesController.listar);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Busca uma turma por ID
 *     description: Retorna os dados completos de uma turma específica através do seu ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da turma
 *         example: 1
 *     responses:
 *       200:
 *         description: Turma encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Turma não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             example:
 *               message: "Turma não encontrada"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             example:
 *               message: "ID inválido ou erro no servidor"
 *               error: "Detalhes do erro"
 */
routerClasses.get("/:id", ClassesController.buscarPorId);

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Cria uma nova turma
 *     description: Cadastra uma nova turma no sistema com nome, dias da semana e horário obrigatórios
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios não preenchidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             examples:
 *               camposObrigatorios:
 *                 value:
 *                   message: "Erro ao criar a classe"
 *                   error: "Nome, dias da semana e horário são obrigatórios"
 *               nomeInvalido:
 *                 value:
 *                   message: "Erro ao criar a classe"
 *                   error: "Nome deve ter no mínimo 3 caracteres"
 *               statusInvalido:
 *                 value:
 *                   message: "Erro ao criar a classe"
 *                   error: "Status deve ser: Novo, Em contato, Agendado, Convertido ou Desqualificado"
 *               horarioInvalido:
 *                 value:
 *                   message: "Erro ao criar a classe"
 *                   error: "Formato de data/hora inválido"
 */
routerClasses.post("/", ClassesController.criar);

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Atualiza uma turma existente
 *     description: Atualiza parcialmente ou totalmente os dados de uma turma. Campos não enviados mantêm seus valores atuais
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da turma
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassUpdate'
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassUpdateResponse'
 *       404:
 *         description: Turma não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             example:
 *               error: "Classe não encontrada para atualização"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             examples:
 *               statusInvalido:
 *                 value:
 *                   message: "Erro ao atualizar a classe"
 *                   error: "Status inválido"
 *               horarioInvalido:
 *                 value:
 *                   message: "Erro ao atualizar a classe"
 *                   error: "Formato de data/hora inválido"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             example:
 *               message: "Erro ao atualizar a classe"
 *               error: "Detalhes do erro"
 */
routerClasses.put("/:id", ClassesController.atualizar);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Remove uma turma
 *     description: Realiza a exclusão permanente de uma turma do sistema através do seu ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da turma a ser removida
 *         example: 1
 *     responses:
 *       200:
 *         description: Turma removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSuccessMessage'
 *             example:
 *               mensagem: "Classe removida com sucesso"
 *       404:
 *         description: Turma não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             example:
 *               error: "Classe não encontrada"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassError'
 *             example:
 *               message: "Erro ao deletar classe"
 *               error: "Detalhes do erro"
 */
routerClasses.delete("/:id", ClassesController.deletar);

export default routerClasses;

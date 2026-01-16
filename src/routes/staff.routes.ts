import express from "express";
import { StaffsController } from "../controllers/StaffsController.ts";

const routerStaffs = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do funcionário (auto-incrementado)
 *         hire_date:
 *           type: string
 *           format: date
 *           description: Data de contratação do funcionário
 *         USR_ID:
 *           type: string
 *           format: uuid
 *           description: ID do usuário associado
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: 1
 *         hire_date: "2026-01-10"
 *         USR_ID: "550e8400-e29b-41d4-a716-446655440000"
 *         createdAt: "2026-01-16T16:30:00Z"
 *         updatedAt: "2026-01-16T16:30:00Z"
 *
 *     StaffInput:
 *       type: object
 *       required:
 *         - hire_date
 *         - USR_ID
 *       properties:
 *         hire_date:
 *           type: string
 *           format: date
 *           description: Data de contratação (formato YYYY-MM-DD)
 *         USR_ID:
 *           type: string
 *           format: uuid
 *           description: ID do usuário (referência a tabela USERS)
 *       example:
 *         hire_date: "2026-02-01"
 *         USR_ID: "660e8400-e29b-41d4-a716-446655440001"
 *
 *     StaffUpdate:
 *       type: object
 *       properties:
 *         hire_date:
 *           type: string
 *           format: date
 *         USR_ID:
 *           type: string
 *           format: uuid
 *       example:
 *         hire_date: "2026-02-15"
 *
 *     StaffError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *       example:
 *         error: "Registro não encontrado"
 *
 *     StaffSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Registro removido com sucesso"
 *
 *     StaffUpdateResponse:
 *       type: object
 *       properties:
 *         staffs:
 *           $ref: '#/components/schemas/Staff'
 *         mensagem:
 *           type: string
 *       example:
 *         staffs:
 *           id: 1
 *           hire_date: "2026-02-15"
 *           USR_ID: "550e8400-e29b-41d4-a716-446655440000"
 *         mensagem: "Registro de staff atualizado com sucesso"
 *
 *   tags:
 *     - name: Staff
 *       description: Gerenciamento de funcionários
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Lista todos os funcionários
 *     description: Retorna uma lista completa com todos os registros de funcionários cadastrados
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       500:
 *         description: Erro ao listar funcionários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             example:
 *               error: "Erro ao buscar funcionários"
 */
routerStaffs.get("/", StaffsController.listar);

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Cria um novo registro de funcionário
 *     description: Cadastra um novo funcionário no sistema associado a um usuário. O ID é gerado automaticamente
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaffInput'
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             examples:
 *               camposObrigatorios:
 *                 value:
 *                   message: "Não foi possível criar o registro"
 *                   error: "hire_date e USR_ID são obrigatórios"
 *               usuarioInvalido:
 *                 value:
 *                   message: "Não foi possível criar o registro"
 *                   error: "USR_ID não encontrado na tabela USERS"
 */
routerStaffs.post("/", StaffsController.criar);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Busca um funcionário por ID
 *     description: Retorna os dados completos de um registro de funcionário específico através do seu ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do funcionário
 *         example: 1
 *     responses:
 *       200:
 *         description: Funcionário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Funcionário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             example:
 *               message: "Registro de funcionário não encontrado"
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             example:
 *               message: "Erro no servidor ao buscar funcionário"
 *               error: "Detalhes do erro"
 */
routerStaffs.get("/:id", StaffsController.buscarPorId);

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Atualiza um registro de funcionário
 *     description: Atualiza parcialmente ou totalmente os dados de um funcionário. Campos não enviados mantêm seus valores atuais
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do funcionário
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaffUpdate'
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffUpdateResponse'
 *       404:
 *         description: Funcionário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             example:
 *               error: "Registro não encontrado para atualização"
 *       500:
 *         description: Erro ao atualizar funcionário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             example:
 *               message: "Erro ao atualizar registro de funcionário"
 *               error: "Detalhes do erro"
 */
routerStaffs.put("/:id", StaffsController.atualizar);

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Remove um registro de funcionário
 *     description: Realiza a exclusão permanente de um registro de funcionário do sistema através do seu ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do funcionário a ser removido
 *         example: 1
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffSuccessMessage'
 *             example:
 *               mensagem: "Registro removido com sucesso"
 *       404:
 *         description: Funcionário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             example:
 *               error: "Registro não encontrado"
 *       500:
 *         description: Erro ao deletar funcionário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StaffError'
 *             example:
 *               message: "Erro ao deletar o registro"
 *               error: "Detalhes do erro"
 */
routerStaffs.delete("/:id", StaffsController.deletar);

export default routerStaffs;

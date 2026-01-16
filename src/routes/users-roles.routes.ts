import express from "express";
import { UsersRolesController } from "../controllers/Users_RolesController.ts";

const routerUsersRoles = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do vínculo (UUID gerado automaticamente)
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário
 *         role_id:
 *           type: string
 *           format: uuid
 *           description: ID da função/papel
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do vínculo
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         user_id: "660e8400-e29b-41d4-a716-446655440001"
 *         role_id: "770e8400-e29b-41d4-a716-446655440002"
 *         createdAt: "2026-01-16T17:30:00Z"
 *         updatedAt: "2026-01-16T17:30:00Z"
 *
 *     UserRoleInput:
 *       type: object
 *       required:
 *         - user_id
 *         - role_id
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário (referência a tabela users)
 *         role_id:
 *           type: string
 *           format: uuid
 *           description: ID da função (referência a tabela roles)
 *       example:
 *         user_id: "660e8400-e29b-41d4-a716-446655440001"
 *         role_id: "770e8400-e29b-41d4-a716-446655440002"
 *
 *     UserRoleError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Mensagem de sucesso (usado no delete)
 *       example:
 *         error: "Vínculo não encontrado"
 *
 *     UserRoleSuccessMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         message: "Vínculo removido com sucesso"
 *
 *   tags:
 *     - name: Users Roles
 *       description: Gerenciamento de vínculos entre usuários e funções (tabela de associação many-to-many)
 */

/**
 * @swagger
 * /users-roles:
 *   get:
 *     summary: Lista todos os vínculos usuário-função
 *     description: Retorna uma lista completa com todos os vínculos entre usuários e suas funções
 *     tags: [Users Roles]
 *     responses:
 *       200:
 *         description: Lista de vínculos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRole'
 *       500:
 *         description: Erro ao listar vínculos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             example:
 *               error: "Erro ao buscar vínculos"
 */
routerUsersRoles.get("/", UsersRolesController.listar);

/**
 * @swagger
 * /users-roles/{id}:
 *   get:
 *     summary: Busca um vínculo por ID
 *     description: Retorna os dados de um vínculo específico entre usuário e função através do UUID
 *     tags: [Users Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do vínculo
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Vínculo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 *       404:
 *         description: Vínculo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             example:
 *               error: "Vínculo não encontrado"
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             example:
 *               error: "Erro ao buscar vínculo"
 */
routerUsersRoles.get("/:id", UsersRolesController.buscarPorId);

/**
 * @swagger
 * /users-roles:
 *   post:
 *     summary: Cria um novo vínculo usuário-função
 *     description: Associa um usuário a uma função. O ID é gerado automaticamente (UUID). Previne duplicação de vínculos
 *     tags: [Users Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRoleInput'
 *     responses:
 *       201:
 *         description: Vínculo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 *       400:
 *         description: Dados inválidos ou vínculo duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             examples:
 *               camposObrigatorios:
 *                 value:
 *                   error: "Campos 'user_id' e 'role_id' são obrigatórios"
 *               vinculoDuplicado:
 *                 value:
 *                   error: "Vínculo já existe"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             example:
 *               error: "Usuário não encontrado"
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             example:
 *               error: "Erro ao criar vínculo"
 */
routerUsersRoles.post("/", UsersRolesController.criar);

/**
 * @swagger
 * /users-roles/{id}:
 *   delete:
 *     summary: Remove um vínculo usuário-função
 *     description: Realiza a exclusão permanente de um vínculo entre usuário e função através do UUID
 *     tags: [Users Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do vínculo a ser removido
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Vínculo removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleSuccessMessage'
 *             example:
 *               message: "Vínculo removido com sucesso"
 *       404:
 *         description: Vínculo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             example:
 *               error: "Vínculo não encontrado"
 *       500:
 *         description: Erro ao deletar vínculo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoleError'
 *             example:
 *               error: "Erro ao deletar vínculo"
 */
routerUsersRoles.delete("/:id", UsersRolesController.deletar);

export default routerUsersRoles;

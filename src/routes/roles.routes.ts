import express from "express";
import { RolesController } from "../controllers/RolesController.ts";

const routerRoles = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da role
 *         name:
 *           type: string
 *           maxLength: 45
 *           description: Nome da role/função (único)
 *         description:
 *           type: string
 *           maxLength: 255
 *           description: Descrição detalhada da role
 *
 *       example:
 *         id: 1
 *         name: "admin"
 *         description: "Administrador do sistema com acesso total"
 *
 *     RoleInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 45
 *           description: Nome da role (único, obrigatório)
 *         description:
 *           type: string
 *           maxLength: 255
 *           description: Descrição da role (obrigatório)
 *       example:
 *         name: "trainer"
 *         description: "Treinador com acesso a turmas e alunos"
 *
 *     RoleUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 45
 *           description: Novo nome da role
 *         description:
 *           type: string
 *           maxLength: 255
 *           description: Nova descrição da role
 *       example:
 *         name: "manager"
 *         description: "Gerente com acesso administrativo"
 *
 *     RoleError:
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
 *         error: "Role não encontrada"
 *
 *     RoleSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Role removida com sucesso"
 *
 *     RoleUpdateResponse:
 *       type: object
 *       properties:
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         mensagem:
 *           type: string
 *       example:
 *         role:
 *           id: 1
 *           name: "manager"
 *           description: "Gerente com acesso administrativo"
 *         mensagem: "Role atualizada com sucesso"
 *
 *   tags:
 *     - name: Roles
 *       description: Gerenciamento de funções e permissões de usuários
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Lista todas as roles
 *     description: Retorna uma lista completa com todas as funções/roles cadastradas no sistema
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Erro ao listar roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               error: "Erro ao buscar roles"
 */
routerRoles.get("/", RolesController.listar);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Busca uma role por ID
 *     description: Retorna os dados completos de uma role específica através do seu UUID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da role
 *         example: 1
 *     responses:
 *       200:
 *         description: Role encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               error: "Role não encontrada"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               message: "ID fornecido é inválido ou erro no servidor"
 *               error: "Detalhes do erro"
 */
routerRoles.get("/:id", RolesController.buscarPorId);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Cria uma nova role
 *     description: Cadastra uma nova função/role no sistema. O nome deve ser único
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: Role criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Dados inválidos ou nome duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             examples:
 *               nomeDuplicado:
 *                 value:
 *                   message: "Já existe uma role com este nome"
 *               erroValidacao:
 *                 value:
 *                   message: "Não foi possível criar a role"
 *                   error: "Detalhes do erro de validação"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 */
routerRoles.post("/", RolesController.criar);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Atualiza uma role existente
 *     description: Atualiza o nome e/ou descrição de uma role. Valida se o novo nome já existe
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: UUID da role
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleUpdate'
 *     responses:
 *       200:
 *         description: Role atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleUpdateResponse'
 *       400:
 *         description: Nome duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               message: "Já existe outra role com este nome"
 *       404:
 *         description: Role não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               error: "Role não encontrada para atualização"
 *       500:
 *         description: Erro ao atualizar role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               error: "Erro ao atualizar a role"
 *               message: "Detalhes do erro"
 */
routerRoles.put("/:id", RolesController.atualizar);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Remove uma role
 *     description: Realiza a exclusão permanente de uma role. Não permite exclusão se houver usuários associados
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da role a ser removida
 *         example: 1
 *     responses:
 *       200:
 *         description: Role removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleSuccessMessage'
 *             example:
 *               mensagem: "Role removida com sucesso"
 *       400:
 *         description: Role está associada a usuários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               mensagem: "Esta role está associada a usuários e não pode ser removida"
 *       404:
 *         description: Role não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               error: "Role não encontrada"
 *       500:
 *         description: Erro ao deletar role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleError'
 *             example:
 *               mensagem: "Erro ao deletar a role"
 *               error: "Detalhes do erro"
 */
routerRoles.delete("/:id", RolesController.deletar);

export default routerRoles;

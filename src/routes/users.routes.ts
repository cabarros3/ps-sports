import express from "express";
import { UsersController } from "../controllers/UsersController.ts";

const routerUsers = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do usuário (UUID)
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *         birth_date:
 *           type: string
 *           format: date
 *           description: Data de nascimento do usuário
 *         rg:
 *           type: string
 *           description: RG do usuário (opcional)
 *           maxLength: 9
 *         cpf:
 *           type: string
 *           description: CPF único do usuário
 *           maxLength: 11
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do usuário
 *         status:
 *           type: string
 *           enum: [Ativo, Inativo]
 *           description: Status do usuário no sistema
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         name: "Maria Silva Santos"
 *         birth_date: "1990-05-15"
 *         rg: "123456789"
 *         cpf: "12345678901"
 *         email: "maria.silva@example.com"
 *         status: "Ativo"
 *         created_at: "2024-01-15T10:30:00Z"
 *         updated_at: "2024-01-15T10:30:00Z"
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - birthDate
 *         - cpf
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *           maxLength: 100
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Data de nascimento do usuário
 *         rg:
 *           type: string
 *           description: RG do usuário (opcional)
 *           maxLength: 9
 *         cpf:
 *           type: string
 *           description: CPF único do usuário (apenas números)
 *           maxLength: 11
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do usuário
 *           maxLength: 100
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *           minLength: 6
 *         status:
 *           type: string
 *           enum: [Ativo, Inativo]
 *           description: Status do usuário
 *           default: Ativo
 *       example:
 *         name: "João Santos Silva"
 *         birthDate: "1995-08-20"
 *         rg: "987654321"
 *         cpf: "98765432100"
 *         email: "joao.santos@example.com"
 *         password: "senhaSegura123"
 *         status: "Ativo"
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *           maxLength: 100
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Data de nascimento do usuário
 *         rg:
 *           type: string
 *           description: RG do usuário
 *           maxLength: 9
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do usuário
 *           maxLength: 100
 *         status:
 *           type: string
 *           enum: [Ativo, Inativo]
 *           description: Status do usuário
 *       example:
 *         name: "João Santos Silva Atualizado"
 *         email: "joao.novo@example.com"
 *         status: "Ativo"
 *
 *     UserError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Mensagem descritiva do erro
 *       example:
 *         error: "Usuário não encontrado"
 *
 *     UserSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Usuário removido com sucesso"
 *
 *     UserUpdateResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de sucesso
 *         user:
 *           $ref: '#/components/schemas/User'
 *       example:
 *         message: "Usuário atualizado com sucesso"
 *         user:
 *           id: "550e8400-e29b-41d4-a716-446655440000"
 *           name: "Maria Silva Atualizada"
 *           birth_date: "1990-05-15"
 *           cpf: "12345678901"
 *           email: "maria.nova@example.com"
 *           status: "Ativo"
 *           created_at: "2024-01-15T10:30:00Z"
 *           updated_at: "2024-01-16T14:20:00Z"
 *
 *   tags:
 *     - name: Users
 *       description: Gerenciamento de usuários do sistema
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista com todos os usuários cadastrados no sistema. A senha não é retornada por segurança
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *             example:
 *               error: "Erro ao buscar usuários"
 */
routerUsers.get("/", UsersController.listar);

/**
 * @swaggersss
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     description: Retorna os dados de um usuário específico através do seu ID (UUID). A senha não é retornada por segurança
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do usuário
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *             example:
 *               error: "Usuário não encontrado"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "ID inválido ou erro no servidor"
 *               error: "invalid input syntax for type uuid"
 */
routerUsers.get("/:id", UsersController.buscarPorId);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cadastra um novo usuário no sistema. O email e CPF devem ser únicos. A senha será armazenada com hash (implementação futura com bcrypt)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             examples:
 *               emailJaCadastrado:
 *                 value:
 *                   message: "E-mail já cadastrado"
 *               erroValidacao:
 *                 value:
 *                   message: "Erro ao criar usuário"
 *                   error: "Validation error: email must be valid"
 *               cpfDuplicado:
 *                 value:
 *                   message: "Erro ao criar usuário"
 *                   error: "Unique constraint failed: cpf"
 *       500:
 *         description: Erro interno do servidor
 */
routerUsers.post("/", UsersController.criar);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     description: Atualiza os dados de um usuário específico através do seu ID. CPF e senha não podem ser alterados por esta rota. A senha será removida da resposta por segurança
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do usuário
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserUpdateResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *             example:
 *               error: "Usuário não encontrado"
 *       500:
 *         description: Erro interno ao atualizar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Erro interno ao atualizar usuário"
 *               error: "Database connection failed"
 */
routerUsers.put("/:id", UsersController.atualizar);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     description: Realiza a exclusão permanente de um usuário através do seu ID (UUID)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do usuário
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccessMessage'
 *             example:
 *               mensagem: "Usuário removido com sucesso"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserError'
 *             example:
 *               error: "Usuário não encontrado"
 *       500:
 *         description: Erro ao deletar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Erro ao deletar usuário"
 *               error: "Foreign key constraint failed"
 */
routerUsers.delete("/:id", UsersController.deletar);

export default routerUsers;

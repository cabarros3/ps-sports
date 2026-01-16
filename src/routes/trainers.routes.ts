import express from "express";
import { TrainersController } from "../controllers/TrainersController.ts";

const routerTrainers = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Trainer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do treinador (UUID gerado automaticamente)
 *         license_level:
 *           type: string
 *           maxLength: 50
 *           description: Nível de licença do treinador
 *         specialty:
 *           type: string
 *           maxLength: 50
 *           description: Especialidade do treinador
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário associado
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         license_level: "Nível 3 - UEFA Pro"
 *         specialty: "Preparação Física"
 *         user_id: "660e8400-e29b-41d4-a716-446655440001"
 *         created_at: "2026-01-16T17:00:00Z"
 *         updated_at: "2026-01-16T17:00:00Z"
 *
 *     TrainerWithUser:
 *       type: object
 *       properties:
 *         license_level:
 *           type: string
 *           maxLength: 50
 *         specialty:
 *           type: string
 *           maxLength: 50
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *       example:
 *         license_level: "Nível 2 - UEFA A"
 *         specialty: "Futebol"
 *         user:
 *           name: "Carlos Eduardo Silva"
 *           email: "carlos.silva@example.com"
 *
 *     TrainerInput:
 *       type: object
 *       required:
 *         - user_id
 *       properties:
 *         license_level:
 *           type: string
 *           maxLength: 50
 *           description: Nível de licença (opcional)
 *         specialty:
 *           type: string
 *           maxLength: 50
 *           description: Especialidade (opcional)
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário (obrigatório, referência a tabela users)
 *       example:
 *         license_level: "Nível 1 - UEFA B"
 *         specialty: "Futsal"
 *         user_id: "770e8400-e29b-41d4-a716-446655440002"
 *
 *     TrainerUpdate:
 *       type: object
 *       properties:
 *         license_level:
 *           type: string
 *           maxLength: 50
 *         specialty:
 *           type: string
 *           maxLength: 50
 *       example:
 *         license_level: "Nível 3 - UEFA Pro"
 *         specialty: "Táticas Ofensivas"
 *
 *     TrainerError:
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
 *         error: "Treinador não encontrado"
 *
 *     TrainerSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Treinador removido com sucesso"
 *
 *     TrainerUpdateResponse:
 *       type: object
 *       properties:
 *         trainerId:
 *           $ref: '#/components/schemas/Trainer'
 *         mensagem:
 *           type: string
 *       example:
 *         trainerId:
 *           id: "550e8400-e29b-41d4-a716-446655440000"
 *           license_level: "Nível 3 - UEFA Pro"
 *           specialty: "Táticas Ofensivas"
 *           user_id: "660e8400-e29b-41d4-a716-446655440001"
 *         mensagem: "Lead atualizado com sucesso"
 *
 *   tags:
 *     - name: Trainers
 *       description: Gerenciamento de treinadores
 */

/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Lista todos os treinadores
 *     description: Retorna uma lista completa com todos os treinadores cadastrados, incluindo informações do usuário associado
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: Lista de treinadores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainerWithUser'
 *       500:
 *         description: Erro ao listar treinadores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             example:
 *               error: "Erro ao buscar treinadores"
 */
routerTrainers.get("/", TrainersController.listar);

/**
 * @swagger
 * /trainers:
 *   post:
 *     summary: Cria um novo treinador
 *     description: Cadastra um novo treinador no sistema associado a um usuário. O ID é gerado automaticamente (UUID)
 *     tags: [Trainers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerInput'
 *     responses:
 *       201:
 *         description: Treinador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       400:
 *         description: Dados inválidos ou user_id ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             examples:
 *               campoObrigatorio:
 *                 value:
 *                   message: "Não foi possível criar o treinador"
 *                   error: "user_id é obrigatório"
 *               usuarioInvalido:
 *                 value:
 *                   message: "Não foi possível criar o treinador"
 *                   error: "user_id não encontrado na tabela users"
 */
routerTrainers.post("/", TrainersController.criar);

/**
 * @swagger
 * /trainers/{id}:
 *   get:
 *     summary: Busca um treinador por ID
 *     description: Retorna os dados completos de um treinador específico através do seu UUID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do treinador
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Treinador encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       404:
 *         description: Treinador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             example:
 *               error: "Treinador não encontrado"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             example:
 *               message: "ID fornecido é inválido ou erro no servidor"
 *               error: "Detalhes do erro"
 */
routerTrainers.get("/:id", TrainersController.buscarPorId);

/**
 * @swagger
 * /trainers/{id}:
 *   put:
 *     summary: Atualiza um treinador existente
 *     description: Atualiza o nível de licença e/ou especialidade de um treinador
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do treinador
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerUpdate'
 *     responses:
 *       200:
 *         description: Treinador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerUpdateResponse'
 *       404:
 *         description: Treinador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             example:
 *               error: "Treinador não encontrado para atualização"
 *       500:
 *         description: Erro ao atualizar treinador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             example:
 *               message: "Erro ao atualizar o treinador"
 *               error: "Detalhes do erro"
 */
routerTrainers.put("/:id", TrainersController.atualizar);

/**
 * @swagger
 * /trainers/{id}:
 *   delete:
 *     summary: Remove um treinador
 *     description: Realiza a exclusão permanente de um treinador do sistema através do seu UUID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do treinador a ser removido
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Treinador removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerSuccessMessage'
 *             example:
 *               mensagem: "Treinador removido com sucesso"
 *       404:
 *         description: Treinador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             example:
 *               error: "Lead não encontrado"
 *       500:
 *         description: Erro ao deletar treinador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerError'
 *             example:
 *               mensagem: "Erro ao deletar o treinador"
 *               error: "Detalhes do erro"
 */
routerTrainers.delete("/:id", TrainersController.deletar);

export default routerTrainers;

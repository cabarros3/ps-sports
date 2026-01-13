import express from "express";
import { PlayersController } from "../controllers/PlayersController.ts";

const routerPlayers = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do jogador
 *         weight:
 *           type: number
 *           format: decimal
 *           description: Peso do jogador em kg
 *         height:
 *           type: number
 *           format: decimal
 *           description: Altura do jogador em metros
 *         primary_position:
 *           type: string
 *           maxLength: 45
 *           description: Posição primária do jogador em campo
 *         second_position:
 *           type: string
 *           maxLength: 45
 *           description: Posição secundária do jogador
 *         dominant_foot:
 *           type: string
 *           maxLength: 45
 *           description: Pé dominante (direito/esquerdo)
 *         entry_date:
 *           type: string
 *           format: date
 *           description: Data de entrada no sistema
 *         sport_status:
 *           type: string
 *           maxLength: 45
 *           description: Status esportivo atual (ativo/inativo/lesionado)
 *         notes:
 *           type: string
 *           description: Observações adicionais sobre o jogador
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário associado
 *         school_id:
 *           type: string
 *           format: uuid
 *           description: ID da escola associada
 *       example:
 *         id: 1
 *         weight: 75.50
 *         height: 1.82
 *         primary_position: "Atacante"
 *         second_position: "Meio-campo"
 *         dominant_foot: "Direito"
 *         entry_date: "2026-01-10"
 *         sport_status: "Ativo"
 *         notes: "Jogador com boa visão de jogo"
 *         user_id: "550e8400-e29b-41d4-a716-446655440000"
 *         school_id: "660e8400-e29b-41d4-a716-446655440001"
 *
 *     PlayerInput:
 *       type: object
 *       required:
 *         - weight
 *         - height
 *         - second_position
 *         - dominant_foot
 *         - entry_date
 *         - sport_status
 *         - user_id
 *         - school_id
 *       properties:
 *         weight:
 *           type: number
 *           format: decimal
 *           description: Peso do jogador em kg
 *           minimum: 0
 *         height:
 *           type: number
 *           format: decimal
 *           description: Altura do jogador em metros
 *           minimum: 0
 *         primary_position:
 *           type: string
 *           maxLength: 45
 *           description: Posição primária (opcional)
 *         second_position:
 *           type: string
 *           maxLength: 45
 *           description: Posição secundária
 *         dominant_foot:
 *           type: string
 *           maxLength: 45
 *           enum: [Direito, Esquerdo, Ambidestro]
 *           description: Pé dominante
 *         entry_date:
 *           type: string
 *           format: date
 *           description: Data de entrada
 *         sport_status:
 *           type: string
 *           maxLength: 45
 *           enum: [Ativo, Inativo, Lesionado, Suspenso]
 *           description: Status esportivo
 *         notes:
 *           type: string
 *           description: Observações (opcional)
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário
 *         school_id:
 *           type: string
 *           format: uuid
 *           description: ID da escola
 *       example:
 *         weight: 72.00
 *         height: 1.78
 *         primary_position: "Zagueiro"
 *         second_position: "Lateral"
 *         dominant_foot: "Esquerdo"
 *         entry_date: "2026-01-12"
 *         sport_status: "Ativo"
 *         notes: "Boa aptidão física"
 *         user_id: "550e8400-e29b-41d4-a716-446655440000"
 *         school_id: "660e8400-e29b-41d4-a716-446655440001"
 *
 *     PlayerUpdate:
 *       type: object
 *       properties:
 *         weight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *         height:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *         primary_position:
 *           type: string
 *           maxLength: 45
 *         second_position:
 *           type: string
 *           maxLength: 45
 *         dominant_foot:
 *           type: string
 *           maxLength: 45
 *           enum: [Direito, Esquerdo, Ambidestro]
 *         entry_date:
 *           type: string
 *           format: date
 *         sport_status:
 *           type: string
 *           maxLength: 45
 *           enum: [Ativo, Inativo, Lesionado, Suspenso]
 *         notes:
 *           type: string
 *         user_id:
 *           type: string
 *           format: uuid
 *         school_id:
 *           type: string
 *           format: uuid
 *       example:
 *         weight: 73.50
 *         height: 1.79
 *         sport_status: "Lesionado"
 *         notes: "Recuperando de lesão no joelho"
 *
 *     PlayerError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *       example:
 *         error: "Jogador não encontrado"
 *
 *     PlayerSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Jogador removido com sucesso"
 *
 *     PlayerUpdateResponse:
 *       type: object
 *       properties:
 *         playerId:
 *           $ref: '#/components/schemas/Player'
 *         mensagem:
 *           type: string
 *       example:
 *         playerId:
 *           id: 1
 *           weight: 74.00
 *           height: 1.80
 *           sport_status: "Ativo"
 *         mensagem: "Jogador atualizado com sucesso"
 *
 *   tags:
 *     - name: Players
 *       description: Gerenciamento de jogadores
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Lista todos os jogadores
 *     description: Retorna uma lista completa com todos os jogadores cadastrados no sistema
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Lista de jogadores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             example:
 *               error: "Erro ao buscar jogadores"
 */
routerPlayers.get("/", PlayersController.listar);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Busca um jogador por ID
 *     description: Retorna os dados completos de um jogador específico através do seu ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do jogador
 *         example: 1
 *     responses:
 *       200:
 *         description: Jogador encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             example:
 *               message: "Jogador não encontrado"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             example:
 *               message: "ID inválido ou erro no servidor"
 *               error: "Detalhes do erro"
 */
routerPlayers.get("/:id", PlayersController.buscarPorId);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Cria um novo jogador
 *     description: Cadastra um novo jogador no sistema com todos os dados necessários
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerInput'
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios não preenchidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             examples:
 *               camposObrigatorios:
 *                 value:
 *                   message: "Erro ao criar o jogador"
 *                   error: "Campos obrigatórios não preenchidos"
 *               dadosInvalidos:
 *                 value:
 *                   message: "Erro ao criar o jogador"
 *                   error: "Peso e altura devem ser valores numéricos positivos"
 */
routerPlayers.post("/", PlayersController.criar);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Atualiza um jogador existente
 *     description: Atualiza parcialmente ou totalmente os dados de um jogador. Campos não enviados mantêm seus valores atuais
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do jogador
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerUpdate'
 *     responses:
 *       200:
 *         description: Jogador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerUpdateResponse'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             example:
 *               error: "Jogador não encontrado para atualização"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             example:
 *               message: "Erro ao atualizar o jogador"
 *               error: "Detalhes do erro"
 */
routerPlayers.put("/:id", PlayersController.atualizar);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Remove um jogador
 *     description: Realiza a exclusão permanente de um jogador do sistema através do seu ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do jogador a ser removido
 *         example: 1
 *     responses:
 *       200:
 *         description: Jogador removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerSuccessMessage'
 *             example:
 *               mensagem: "Jogador removido com sucesso"
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             example:
 *               error: "Jogador não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerError'
 *             example:
 *               message: "Erro ao deletar jogador"
 *               error: "Detalhes do erro"
 */
routerPlayers.delete("/:id", PlayersController.deletar);

export default routerPlayers;

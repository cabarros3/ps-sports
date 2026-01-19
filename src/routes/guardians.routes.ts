import { Router } from "express";
import GuardianController from "../controllers/GuardianController.ts";

const guardiansRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Guardian:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do responsável (auto-incrementado)
 *         name:
 *           type: string
 *           description: Nome completo do responsável
 *         cpf:
 *           type: string
 *           description: CPF do responsável (único)
 *         phone:
 *           type: string
 *           description: Telefone de contato
 *         email:
 *           type: string
 *           format: email
 *           description: Email do responsável
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
 *         name: "Maria Silva Santos"
 *         cpf: "123.456.789-00"
 *         phone: "(81) 98765-4321"
 *         email: "maria.santos@example.com"
 *         createdAt: "2026-01-16T14:30:00Z"
 *         updatedAt: "2026-01-16T14:30:00Z"
 *
 *     GuardianInput:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - cpf
 *         - phone
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário associado
 *         name:
 *           type: string
 *           description: Nome completo do responsável
 *         cpf:
 *           type: string
 *           description: CPF do responsável (formato XXX.XXX.XXX-XX)
 *           pattern: '^\d{3}\.\d{3}\.\d{3}-\d{2}$'
 *         phone:
 *           type: string
 *           description: Telefone de contato
 *         email:
 *           type: string
 *           format: email
 *           description: Email do responsável
 *       example:
 *         id: 15
 *         name: "João Pedro Oliveira"
 *         cpf: "987.654.321-00"
 *         phone: "(81) 99876-5432"
 *         email: "joao.oliveira@example.com"
 *
 *     GuardianError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *       example:
 *         error: "Não encontrado"
 *
 *   tags:
 *     - name: Guardians
 *       description: Gerenciamento de responsáveis/tutores
 */

/**
 * @swagger
 * /guardians:
 *   post:
 *     summary: Cria um novo responsável
 *     description: Cadastra um novo responsável/tutor no sistema. O ID é gerado automaticamente
 *     tags: [Guardians]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GuardianInput'
 *     responses:
 *       201:
 *         description: Responsável criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guardian'
 *       400:
 *         description: Dados inválidos ou CPF duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GuardianError'
 *             examples:
 *               camposObrigatorios:
 *                 value:
 *                   error: "Todos os campos são obrigatórios"
 *               cpfDuplicado:
 *                 value:
 *                   error: "CPF já cadastrado no sistema"
 *               cpfInvalido:
 *                 value:
 *                   error: "Formato de CPF inválido"
 *               emailInvalido:
 *                 value:
 *                   error: "Formato de email inválido"
 */
guardiansRoutes.post("/", GuardianController.create);

/**
 * @swagger
 * /guardians/{id}:
 *   get:
 *     summary: Busca um responsável por ID
 *     description: Retorna os dados completos de um responsável específico através do seu ID
 *     tags: [Guardians]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do responsável
 *         example: 1
 *     responses:
 *       200:
 *         description: Responsável encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guardian'
 *       404:
 *         description: Responsável não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GuardianError'
 *             example:
 *               error: "Não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GuardianError'
 *             example:
 *               error: "Erro ao buscar responsável"
 */
guardiansRoutes.get("/:id", GuardianController.show);

export default guardiansRoutes;

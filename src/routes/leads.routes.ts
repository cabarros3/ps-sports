import express from "express";
import { LeadsController } from "../controllers/LeadsController.ts";

const routerLeads = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lead:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do lead (UUID)
 *         name:
 *           type: string
 *           description: Nome completo do lead
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do lead
 *         phone:
 *           type: string
 *           description: Telefone de contato do lead
 *         entry_date:
 *           type: string
 *           format: date-time
 *           description: Data de entrada/cadastro do lead no sistema
 *         source:
 *           type: string
 *           description: Origem/fonte de captação do lead
 *         status:
 *           type: string
 *           enum: [Novo, Em contato, Agendado, Convertido, Desqualificado]
 *           description: Status atual do lead no funil
 *         magic_token:
 *           type: string
 *           description: Token mágico para acesso temporário (uso futuro)
 *         magic_expires_at:
 *           type: string
 *           format: date-time
 *           description: Data de expiração do token mágico
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         name: "Carlos Oliveira"
 *         email: "carlos.oliveira@empresa.com"
 *         phone: "+55 81 99999-8888"
 *         entry_date: "2024-01-15T10:30:00Z"
 *         source: "Site - Formulário de contato"
 *         status: "Novo"
 *         magic_token: ""
 *         magic_expires_at: "2024-01-22T10:30:00Z"
 *
 *     LeadInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do lead
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do lead
 *         phone:
 *           type: string
 *           description: Telefone de contato
 *         source:
 *           type: string
 *           description: Origem de captação do lead (ex. site, landing page, indicação)
 *         status:
 *           type: string
 *           enum: [Novo, Em contato, Agendado, Convertido, Desqualificado]
 *           description: Status inicial do lead
 *           default: Novo
 *       example:
 *         name: "Ana Paula Costa"
 *         email: "ana.costa@startup.com"
 *         phone: "+55 81 98888-7777"
 *         source: "Landing Page - Ebook Marketing Digital"
 *         status: "Novo"
 *
 *     LeadUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do lead
 *         email:
 *           type: string
 *           format: email
 *           description: Email do lead
 *         phone:
 *           type: string
 *           description: Telefone de contato
 *         source:
 *           type: string
 *           description: Origem de captação
 *         status:
 *           type: string
 *           enum: [Novo, Em contato, Agendado, Convertido, Desqualificado]
 *           description: Status do lead
 *         magic_token:
 *           type: string
 *           description: Token mágico para acesso
 *         magic_expires_at:
 *           type: string
 *           format: date-time
 *           description: Data de expiração do token
 *       example:
 *         name: "Ana Paula Costa Silva"
 *         status: "Em contato"
 *         phone: "+55 81 98888-7777"
 *
 *     LeadListResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         source:
 *           type: string
 *         status:
 *           type: string
 *       example:
 *         name: "Carlos Oliveira"
 *         email: "carlos.oliveira@empresa.com"
 *         phone: "+55 81 99999-8888"
 *         source: "Site"
 *         status: "Novo"
 *
 *     LeadError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *       example:
 *         error: "Lead não encontrado"
 *
 *     LeadSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Lead removido com sucesso"
 *
 *     LeadUpdateResponse:
 *       type: object
 *       properties:
 *         leadId:
 *           $ref: '#/components/schemas/Lead'
 *         mensagem:
 *           type: string
 *       example:
 *         leadId:
 *           id: "550e8400-e29b-41d4-a716-446655440000"
 *           name: "Carlos Oliveira Atualizado"
 *           email: "carlos.oliveira@empresa.com"
 *           phone: "+55 81 99999-8888"
 *           source: "Site"
 *           status: "Em contato"
 *           entry_date: "2024-01-15T10:30:00Z"
 *         mensagem: "Lead atualizado com sucesso"
 *
 *   tags:
 *     - name: Leads
 *       description: Gerenciamento de leads e oportunidades de vendas
 */

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Lista todos os leads
 *     description: Retorna uma lista simplificada com todos os leads cadastrados no sistema (name, email, phone, source, status). Dados sensíveis como magic_token não são retornados
 *     tags: [Leads]
 *     responses:
 *       200:
 *         description: Lista de leads retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeadListResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Erro ao buscar leads no banco de dados"
 */
routerLeads.get("/", LeadsController.listar);

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Busca um lead por ID
 *     description: Retorna os dados completos de um lead específico através do seu ID (UUID)
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do lead
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Lead encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Lead não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Lead não encontrado"
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
 *               message: "ID fornecido é inválido ou erro no servidor"
 *               error: "invalid input syntax for type uuid"
 */
routerLeads.get("/:id", LeadsController.buscarPorId);

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Cria um novo lead
 *     description: Cadastra um novo lead no sistema. O email deve ser único. Os campos magic_token e magic_expires_at são gerados automaticamente (implementação futura). A entry_date é definida automaticamente como a data atual
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeadInput'
 *     responses:
 *       201:
 *         description: Lead criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       400:
 *         description: Dados inválidos ou erro na criação
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
 *               emailInvalido:
 *                 value:
 *                   message: "Não foi possível criar o lead"
 *                   error: "Validation error: email must be valid"
 *               emailDuplicado:
 *                 value:
 *                   message: "Não foi possível criar o lead"
 *                   error: "Unique constraint failed: email"
 *               campoObrigatorio:
 *                 value:
 *                   message: "Não foi possível criar o lead"
 *                   error: "notNull Violation: name cannot be null"
 *       500:
 *         description: Erro interno do servidor
 */
routerLeads.post("/", LeadsController.criar);

/**
 * @swagger
 * /leads/{id}:
 *   put:
 *     summary: Atualiza um lead existente
 *     description: Atualiza os dados de um lead específico. Todos os campos são opcionais. Se um campo não for enviado, o valor atual será mantido. O campo entry_date não pode ser alterado
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do lead
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeadUpdate'
 *     responses:
 *       200:
 *         description: Lead atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadUpdateResponse'
 *       404:
 *         description: Lead não encontrado para atualização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Lead não encontrado para atualização"
 *       409:
 *         description: Conflito - email já está em uso por outro lead
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "O novo e-mail já está em uso por outro lead."
 *       500:
 *         description: Erro ao atualizar o lead
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Erro ao atualizar o lead"
 */
routerLeads.put("/:id", LeadsController.atualizar);

/**
 * @swagger
 * /leads/{id}:
 *   delete:
 *     summary: Remove um lead
 *     description: Realiza a exclusão permanente de um lead através do seu ID (UUID)
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do lead
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Lead removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadSuccessMessage'
 *             example:
 *               mensagem: "Lead removido com sucesso"
 *       404:
 *         description: Lead não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Lead não encontrado"
 *       500:
 *         description: Erro ao deletar o lead
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               mensagem: "Erro ao deletar o lead"
 *               error: "Database connection timeout"
 */
routerLeads.delete("/:id", LeadsController.deletar);

export default routerLeads;

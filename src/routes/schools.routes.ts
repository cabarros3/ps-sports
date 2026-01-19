import express from "express";
import { SchoolsController } from "../controllers/SchoolsController.ts";

const routerSchools = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único da escola (UUID gerado automaticamente)
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Nome da escola
 *         address:
 *           type: string
 *           maxLength: 100
 *           description: Endereço da escola
 *         phone:
 *           type: string
 *           maxLength: 100
 *           description: Telefone de contato
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         name: "Escola de Esportes Champions"
 *         address: "Rua das Flores, 123 - Boa Viagem, Recife - PE"
 *         phone: "(81) 3456-7890"
 *
 *     SchoolInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Nome da escola (obrigatório)
 *         address:
 *           type: string
 *           maxLength: 100
 *           description: Endereço da escola (opcional)
 *         phone:
 *           type: string
 *           maxLength: 100
 *           description: Telefone de contato (opcional)
 *       example:
 *         name: "Academia Esportiva Recife"
 *         address: "Av. Conselheiro Aguiar, 456 - Recife - PE"
 *         phone: "(81) 99123-4567"
 *
 *     SchoolUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Novo nome da escola
 *         address:
 *           type: string
 *           maxLength: 100
 *           description: Novo endereço
 *         phone:
 *           type: string
 *           maxLength: 100
 *           description: Novo telefone
 *       example:
 *         name: "Escola de Esportes Champions Atualizada"
 *         address: "Rua das Flores, 456 - Boa Viagem, Recife - PE"
 *         phone: "(81) 3456-7899"
 *
 *     SchoolError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *       example:
 *         error: "Escola não encontrada"
 *
 *     SchoolSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Escola removida com sucesso"
 *
 *     SchoolUpdateResponse:
 *       type: object
 *       properties:
 *         schools:
 *           $ref: '#/components/schemas/School'
 *         mensagem:
 *           type: string
 *       example:
 *         schools:
 *           id: "550e8400-e29b-41d4-a716-446655440000"
 *           name: "Escola de Esportes Champions"
 *           address: "Rua das Flores, 123 - Recife - PE"
 *           phone: "(81) 3456-7890"
 *         mensagem: "Escola atualizada com sucesso"
 *
 *   tags:
 *     - name: Schools
 *       description: Gerenciamento de escolas esportivas
 */

/**
 * @swagger
 * /schools:
 *   get:
 *     summary: Lista todas as escolas
 *     description: Retorna uma lista completa com todas as escolas cadastradas no sistema
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: Lista de escolas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 *       500:
 *         description: Erro ao listar escolas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               error: "Erro ao buscar escolas"
 */
routerSchools.get("/", SchoolsController.listar);

/**
 * @swagger
 * /schools/{id}:
 *   get:
 *     summary: Busca uma escola por ID
 *     description: Retorna os dados completos de uma escola específica através do seu UUID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da escola
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Escola encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       404:
 *         description: Escola não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               error: "Escola não encontrada"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               message: "ID fornecido é inválido ou erro no servidor"
 *               error: "Detalhes do erro"
 */
routerSchools.get("/:id", SchoolsController.buscarPorId);

/**
 * @swagger
 * /schools:
 *   post:
 *     summary: Cria uma nova escola
 *     description: Cadastra uma nova escola esportiva no sistema. O ID UUID é gerado automaticamente
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolInput'
 *     responses:
 *       201:
 *         description: Escola criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               message: "Não foi possível criar a escola"
 *               error: "Nome é obrigatório"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 */
routerSchools.post("/", SchoolsController.criar);

/**
 * @swagger
 * /schools/{id}:
 *   put:
 *     summary: Atualiza uma escola existente
 *     description: Atualiza parcialmente ou totalmente os dados de uma escola. Campos não enviados mantêm seus valores atuais
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da escola
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolUpdate'
 *     responses:
 *       200:
 *         description: Escola atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolUpdateResponse'
 *       404:
 *         description: Escola não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               error: "Escola não encontrada para atualização"
 *       500:
 *         description: Erro ao atualizar escola
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               message: "Erro ao atualizar a escola"
 *               error: "Detalhes do erro"
 */
routerSchools.put("/:id", SchoolsController.atualizar);

/**
 * @swagger
 * /schools/{id}:
 *   delete:
 *     summary: Remove uma escola
 *     description: Realiza a exclusão permanente de uma escola do sistema através do seu UUID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da escola a ser removida
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Escola removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolSuccessMessage'
 *             example:
 *               mensagem: "Escola removida com sucesso"
 *       404:
 *         description: Escola não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               error: "Escola não encontrada"
 *       500:
 *         description: Erro ao deletar escola
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolError'
 *             example:
 *               message: "Erro ao deletar a escola"
 *               error: "Detalhes do erro"
 */
routerSchools.delete("/:id", SchoolsController.deletar);

export default routerSchools;

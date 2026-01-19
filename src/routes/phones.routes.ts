import express from "express";
import { PhonesController } from "../controllers/PhonesController.ts";

const routesPhones = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Phone:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do telefone (auto-incrementado)
 *         number:
 *           type: string
 *           maxLength: 20
 *           description: Número de telefone (único)
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário
 *       example:
 *         id: 1
 *         number: "+5581999998888"
 *         user_id: "550e8400-e29b-41d4-a716-446655440000"
 *
 *     PhoneInput:
 *       type: object
 *       required:
 *         - number
 *         - user_id
 *       properties:
 *         number:
 *           type: string
 *           maxLength: 20
 *           description: Número de telefone (deve ser único)
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário (obrigatório, referência a tabela USERS)
 *       example:
 *         number: "+5581987654321"
 *         user_id: "660e8400-e29b-41d4-a716-446655440001"
 *
 *     PhoneUpdate:
 *       type: object
 *       properties:
 *         number:
 *           type: string
 *           maxLength: 20
 *           description: Novo número de telefone
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: Novo ID do usuário
 *       example:
 *         number: "+5581911112222"
 *
 *     PhoneError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *       example:
 *         error: "Telefone não encontrado"
 *
 *     PhoneSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Telefone removido com sucesso"
 *
 *     PhoneUpdateResponse:
 *       type: object
 *       properties:
 *         phones:
 *           $ref: '#/components/schemas/Phone'
 *         mensagem:
 *           type: string
 *       example:
 *         phones:
 *           id: 1
 *           number: "+5581911112222"
 *           user_id: "550e8400-e29b-41d4-a716-446655440000"
 *         mensagem: "Telefone atualizado com sucesso"
 *
 *   tags:
 *     - name: Phones
 *       description: Gerenciamento de telefones de usuários
 */

/**
 * @swagger
 * /phones:
 *   get:
 *     summary: Lista todos os telefones
 *     description: Retorna uma lista completa com todos os telefones cadastrados no sistema
 *     tags: [Phones]
 *     responses:
 *       200:
 *         description: Lista de telefones retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Phone'
 *       500:
 *         description: Erro ao listar telefones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               error: "Erro ao buscar telefones"
 */
routesPhones.get("/", PhonesController.listar);

/**
 * @swagger
 * /phones/{id}:
 *   get:
 *     summary: Busca um telefone por ID
 *     description: Retorna os dados completos de um telefone específico através do seu ID
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do telefone
 *         example: 1
 *     responses:
 *       200:
 *         description: Telefone encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Phone'
 *       404:
 *         description: Telefone não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               error: "Telefone não encontrado"
 *       500:
 *         description: ID inválido ou erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               message: "ID fornecido é inválido ou erro no servidor"
 *               error: "Detalhes do erro"
 */
routesPhones.get("/:id", PhonesController.buscarPorId);

/**
 * @swagger
 * /phones:
 *   post:
 *     summary: Cria um novo telefone
 *     description: Cadastra um novo telefone associado a um usuário. O número deve ser único
 *     tags: [Phones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhoneInput'
 *     responses:
 *       201:
 *         description: Telefone criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Phone'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               message: "Não foi possível criar o telefone"
 *               error: "number e user_id são obrigatórios"
 *       409:
 *         description: Número de telefone já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               error: "Este número já está cadastrado."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 */
routesPhones.post("/", PhonesController.criar);

/**
 * @swagger
 * /phones/{id}:
 *   put:
 *     summary: Atualiza um telefone existente
 *     description: Atualiza o número e/ou usuário de um telefone. Se não informado, mantém os valores atuais
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do telefone
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhoneUpdate'
 *     responses:
 *       200:
 *         description: Telefone atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneUpdateResponse'
 *       404:
 *         description: Telefone não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               error: "Telefone não encontrado para atualização"
 *       409:
 *         description: Número já está em uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               error: "Este número já está em uso"
 *       500:
 *         description: Erro ao atualizar telefone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               error: "Erro ao atualizar o telefone"
 */
routesPhones.put("/:id", PhonesController.atualizar);

/**
 * @swagger
 * /phones/{id}:
 *   delete:
 *     summary: Remove um telefone
 *     description: Realiza a exclusão permanente de um telefone do sistema através do seu ID
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do telefone a ser removido
 *         example: 1
 *     responses:
 *       200:
 *         description: Telefone removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneSuccessMessage'
 *             example:
 *               mensagem: "Telefone removido com sucesso"
 *       404:
 *         description: Telefone não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               error: "Telefone não encontrado"
 *       500:
 *         description: Erro ao deletar telefone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PhoneError'
 *             example:
 *               message: "Erro ao deletar o sucesso"
 *               error: "Detalhes do erro"
 */
routesPhones.delete("/:id", PhonesController.deletar);

export default routesPhones;

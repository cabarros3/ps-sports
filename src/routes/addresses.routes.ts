import express from "express";
import { AddressesController } from "../controllers/AddressesController.ts";

const routerAddresses = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do endereço
 *         street:
 *           type: string
 *           description: Nome da rua/avenida
 *           maxLength: 255
 *         number:
 *           type: string
 *           description: Número do endereço
 *           maxLength: 10
 *         complement:
 *           type: string
 *           description: Complemento do endereço (apto, bloco, etc)
 *           maxLength: 100
 *         neighborhood:
 *           type: string
 *           description: Bairro
 *           maxLength: 100
 *         city:
 *           type: string
 *           description: Cidade
 *           maxLength: 50
 *         state:
 *           type: string
 *           description: Estado (sigla com 2 caracteres)
 *           maxLength: 2
 *         zipcode:
 *           type: string
 *           description: CEP do endereço
 *           maxLength: 10
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: UUID do usuário dono do endereço
 *       example:
 *         id: 1
 *         street: "Rua das Flores"
 *         number: "123"
 *         complement: "Apto 45"
 *         neighborhood: "Jardim Primavera"
 *         city: "Recife"
 *         state: "PE"
 *         zipcode: "50000-000"
 *         user_id: "550e8400-e29b-41d4-a716-446655440000"
 *
 *     AddressInput:
 *       type: object
 *       required:
 *         - street
 *         - number
 *         - neighborhood
 *         - city
 *         - state
 *         - zipcode
 *         - user_id
 *       properties:
 *         street:
 *           type: string
 *           description: Nome da rua/avenida
 *           maxLength: 255
 *         number:
 *           type: string
 *           description: Número do endereço
 *           maxLength: 10
 *         complement:
 *           type: string
 *           description: Complemento do endereço (opcional)
 *           maxLength: 100
 *         neighborhood:
 *           type: string
 *           description: Bairro
 *           maxLength: 100
 *         city:
 *           type: string
 *           description: Cidade
 *           maxLength: 50
 *         state:
 *           type: string
 *           description: Estado (sigla com 2 caracteres - ex. PE, SP, RJ)
 *           maxLength: 2
 *           pattern: '^[A-Z]{2}$'
 *         zipcode:
 *           type: string
 *           description: CEP do endereço (ex. 50000-000 ou 50000000)
 *           maxLength: 10
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: UUID do usuário dono do endereço
 *       example:
 *         street: "Avenida Boa Viagem"
 *         number: "5000"
 *         complement: "Bloco A, Sala 302"
 *         neighborhood: "Boa Viagem"
 *         city: "Recife"
 *         state: "PE"
 *         zipcode: "51021-000"
 *         user_id: "550e8400-e29b-41d4-a716-446655440000"
 *
 *     AddressUpdate:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           description: Nome da rua/avenida
 *           maxLength: 255
 *         number:
 *           type: string
 *           description: Número do endereço
 *           maxLength: 10
 *         complement:
 *           type: string
 *           description: Complemento do endereço
 *           maxLength: 100
 *         neighborhood:
 *           type: string
 *           description: Bairro
 *           maxLength: 100
 *         city:
 *           type: string
 *           description: Cidade
 *           maxLength: 50
 *         state:
 *           type: string
 *           description: Estado (sigla com 2 caracteres)
 *           maxLength: 2
 *           pattern: '^[A-Z]{2}$'
 *         zipcode:
 *           type: string
 *           description: CEP do endereço
 *           maxLength: 10
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: UUID do usuário
 *       example:
 *         street: "Rua Nova Esperança"
 *         number: "456"
 *         complement: "Casa"
 *         neighborhood: "Pina"
 *         state: "PE"
 *
 *     AddressListResponse:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *         number:
 *           type: string
 *         complement:
 *           type: string
 *         neighborhood:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zipcode:
 *           type: string
 *       example:
 *         street: "Rua das Flores"
 *         number: "123"
 *         complement: "Apto 45"
 *         neighborhood: "Jardim Primavera"
 *         city: "Recife"
 *         state: "PE"
 *         zipcode: "50000-000"
 *
 *     AddressError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *       example:
 *         error: "Endereço não encontrado"
 *
 *     AddressSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Endereço removido com sucesso"
 *
 *     AddressUpdateResponse:
 *       type: object
 *       properties:
 *         addressId:
 *           $ref: '#/components/schemas/Address'
 *         mensagem:
 *           type: string
 *       example:
 *         addressId:
 *           id: 1
 *           street: "Rua Nova Esperança"
 *           number: "456"
 *           complement: "Casa"
 *           neighborhood: "Pina"
 *           city: "Recife"
 *           state: "PE"
 *           zipcode: "51021-000"
 *           user_id: "550e8400-e29b-41d4-a716-446655440000"
 *         mensagem: "Endereço atualizado com sucesso"
 *
 *   tags:
 *     - name: Addresses
 *       description: Gerenciamento de endereços dos usuários
 */

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Lista todos os endereços
 *     description: Retorna uma lista simplificada com todos os endereços cadastrados no sistema (sem id e user_id por segurança)
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddressListResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressError'
 *             example:
 *               error: "Erro ao buscar endereços no banco de dados"
 */
routerAddresses.get("/", AddressesController.listar);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Busca um endereço por ID
 *     description: Retorna os dados completos de um endereço específico através do seu ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do endereço
 *         example: 1
 *     responses:
 *       200:
 *         description: Endereço encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Endereço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressError'
 *             example:
 *               error: "Endereço não encontrado"
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
 *               error: "Invalid ID format"
 */
routerAddresses.get("/:id", AddressesController.buscarPorId);

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Cria um novo endereço
 *     description: Cadastra um novo endereço no sistema vinculado a um usuário. Todos os campos são obrigatórios exceto complement
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressInput'
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
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
 *               campoObrigatorio:
 *                 value:
 *                   message: "Não foi possível criar o endereço"
 *                   error: "notNull Violation: street cannot be null"
 *               estadoInvalido:
 *                 value:
 *                   message: "Não foi possível criar o endereço"
 *                   error: "state must have exactly 2 characters"
 *               usuarioInexistente:
 *                 value:
 *                   message: "Não foi possível criar o endereço"
 *                   error: "Foreign key constraint failed: user_id"
 *       500:
 *         description: Erro interno do servidor
 */
routerAddresses.post("/", AddressesController.criar);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Atualiza um endereço existente
 *     description: Atualiza os dados de um endereço específico. Todos os campos são opcionais. Se um campo não for enviado, o valor atual será mantido
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do endereço
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressUpdate'
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressUpdateResponse'
 *       404:
 *         description: Endereço não encontrado para atualização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressError'
 *             example:
 *               error: "Endereço não encontrado para atualização"
 *       409:
 *         description: Conflito - erro de constraint (não aplicável neste modelo, mas mantido por consistência)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressError'
 *             example:
 *               error: "Erro de constraint no banco de dados"
 *       500:
 *         description: Erro ao atualizar o endereço
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressError'
 *             example:
 *               error: "Erro ao atualizar o endereço"
 */
routerAddresses.put("/:id", AddressesController.atualizar);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Remove um endereço
 *     description: Realiza a exclusão permanente de um endereço através do seu ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do endereço
 *         example: 1
 *     responses:
 *       200:
 *         description: Endereço removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressSuccessMessage'
 *             example:
 *               mensagem: "Endereço removido com sucesso"
 *       404:
 *         description: Endereço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddressError'
 *             example:
 *               error: "Endereço não encontrado"
 *       500:
 *         description: Erro ao deletar o endereço
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
 *               mensagem: "Erro ao deletar o endereço"
 *               error: "Database connection timeout"
 */
routerAddresses.delete("/:id", AddressesController.deletar);

export default routerAddresses;

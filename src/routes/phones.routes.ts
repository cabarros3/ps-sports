import express from "express";
import { PhonesController } from "../controllers/PhonesController.ts";

const routerPhones = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Telefone:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do telefone
 *         numero:
 *           type: string
 *           description: Número de telefone completo
 *         tipo:
 *           type: string
 *           enum: [residencial, comercial, celular, recado]
 *           description: Tipo de telefone
 *         ddd:
 *           type: string
 *           description: Código de área (DDD)
 *           pattern: '^\d{2}$'
 *         principal:
 *           type: boolean
 *           description: Indica se é o telefone principal de contato
 *         whatsapp:
 *           type: boolean
 *           description: Indica se o número possui WhatsApp
 *         observacao:
 *           type: string
 *           description: Observações sobre o telefone (ex. melhor horário para contato)
 *         proprietario_tipo:
 *           type: string
 *           enum: [aluno, usuario, lead, professor]
 *           description: Tipo de entidade dona do telefone
 *         proprietario_id:
 *           type: integer
 *           description: ID da entidade proprietária do telefone
 *         ativo:
 *           type: boolean
 *           description: Indica se o telefone está ativo
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: 1
 *         numero: "+55 81 99999-8888"
 *         tipo: "celular"
 *         ddd: "81"
 *         principal: true
 *         whatsapp: true
 *         observacao: "Preferência para contato após 18h"
 *         proprietario_tipo: "aluno"
 *         proprietario_id: 15
 *         ativo: true
 *         created_at: "2024-01-15T10:30:00Z"
 *         updated_at: "2024-01-15T10:30:00Z"
 *
 *     TelefoneInput:
 *       type: object
 *       required:
 *         - numero
 *         - tipo
 *         - proprietario_tipo
 *         - proprietario_id
 *       properties:
 *         numero:
 *           type: string
 *           description: Número de telefone completo
 *           pattern: '^\+?[1-9]\d{1,14}$'
 *           example: "+55 81 99999-8888"
 *         tipo:
 *           type: string
 *           enum: [residencial, comercial, celular, recado]
 *           description: Tipo de telefone
 *         ddd:
 *           type: string
 *           description: Código de área (DDD) - extraído automaticamente se não fornecido
 *           pattern: '^\d{2}$'
 *           example: "81"
 *         principal:
 *           type: boolean
 *           description: Define como telefone principal
 *           default: false
 *         whatsapp:
 *           type: boolean
 *           description: Indica se possui WhatsApp
 *           default: false
 *         observacao:
 *           type: string
 *           description: Observações adicionais
 *           maxLength: 500
 *         proprietario_tipo:
 *           type: string
 *           enum: [aluno, usuario, lead, professor]
 *           description: Tipo de proprietário do telefone
 *         proprietario_id:
 *           type: integer
 *           description: ID do proprietário
 *           minimum: 1
 *         ativo:
 *           type: boolean
 *           description: Status do telefone
 *           default: true
 *       example:
 *         numero: "+55 11 98765-4321"
 *         tipo: "celular"
 *         ddd: "11"
 *         principal: true
 *         whatsapp: true
 *         observacao: "Contato comercial"
 *         proprietario_tipo: "lead"
 *         proprietario_id: 42
 *         ativo: true
 *
 *     TelefoneUpdate:
 *       type: object
 *       properties:
 *         numero:
 *           type: string
 *           description: Número de telefone
 *           pattern: '^\+?[1-9]\d{1,14}$'
 *         tipo:
 *           type: string
 *           enum: [residencial, comercial, celular, recado]
 *         ddd:
 *           type: string
 *           pattern: '^\d{2}$'
 *         principal:
 *           type: boolean
 *           description: Define como principal
 *         whatsapp:
 *           type: boolean
 *         observacao:
 *           type: string
 *           maxLength: 500
 *         ativo:
 *           type: boolean
 *       example:
 *         tipo: "comercial"
 *         principal: false
 *         observacao: "Ramal 2045"
 *         whatsapp: false
 *
 *     TelefoneError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *       example:
 *         error: "Telefone não encontrado"
 *
 *     TelefoneSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Telefone removido com sucesso"
 *
 *     TelefoneAtualizadoResponse:
 *       type: object
 *       properties:
 *         telefone:
 *           $ref: '#/components/schemas/Telefone'
 *         mensagem:
 *           type: string
 *       example:
 *         telefone:
 *           id: 1
 *           numero: "+55 81 99999-8888"
 *           tipo: "celular"
 *           ddd: "81"
 *           principal: true
 *           whatsapp: true
 *           observacao: "Atualizado - melhor horário após 18h"
 *           proprietario_tipo: "aluno"
 *           proprietario_id: 15
 *           ativo: true
 *           created_at: "2024-01-15T10:30:00Z"
 *           updated_at: "2024-01-20T14:45:00Z"
 *         mensagem: "Telefone atualizado com sucesso"
 *
 *   tags:
 *     - name: Telefones
 *       description: Gerenciamento de telefones de contato
 */

/**
 * @swagger
 * /telefones:
 *   get:
 *     summary: Lista todos os telefones
 *     description: Retorna uma lista com todos os telefones cadastrados no sistema, com opções de filtro por proprietário, tipo e status
 *     tags: [Telefones]
 *     parameters:
 *       - in: query
 *         name: proprietario_tipo
 *         schema:
 *           type: string
 *           enum: [aluno, usuario, lead, professor]
 *         description: Filtrar telefones por tipo de proprietário
 *         example: aluno
 *       - in: query
 *         name: proprietario_id
 *         schema:
 *           type: integer
 *         description: Filtrar telefones de um proprietário específico
 *         example: 15
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [residencial, comercial, celular, recado]
 *         description: Filtrar por tipo de telefone
 *         example: celular
 *       - in: query
 *         name: principal
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas telefones principais
 *         example: true
 *       - in: query
 *         name: whatsapp
 *         schema:
 *           type: boolean
 *         description: Filtrar telefones com WhatsApp
 *         example: true
 *       - in: query
 *         name: ativo
 *         schema:
 *           type: boolean
 *         description: Filtrar por status ativo/inativo
 *         example: true
 *       - in: query
 *         name: ddd
 *         schema:
 *           type: string
 *           pattern: '^\d{2}$'
 *         description: Filtrar por código de área (DDD)
 *         example: "81"
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Número máximo de resultados
 *         example: 50
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número da página
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de telefones retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 telefones:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Telefone'
 *                 total:
 *                   type: integer
 *                   description: Total de telefones encontrados
 *                 pagina:
 *                   type: integer
 *                   description: Página atual
 *                 totalPaginas:
 *                   type: integer
 *                   description: Total de páginas
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Token de autenticação inválido"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Erro ao listar telefones"
 */
routerPhones.get("/", PhonesController.listar);

/**
 * @swagger
 * /telefones/{id}:
 *   get:
 *     summary: Busca um telefone por ID
 *     description: Retorna os dados completos de um telefone específico através do seu ID
 *     tags: [Telefones]
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
 *               $ref: '#/components/schemas/Telefone'
 *       404:
 *         description: Telefone não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Telefone não encontrado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Acesso não autorizado"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "ID deve ser um número inteiro válido"
 *       500:
 *         description: Erro interno do servidor
 */
routerPhones.get("/:id", PhonesController.buscarPorId);

/**
 * @swagger
 * /telefones:
 *   post:
 *     summary: Cria um novo telefone
 *     description: Cadastra um novo telefone vinculado a um proprietário (aluno, usuário, lead ou professor)
 *     tags: [Telefones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TelefoneInput'
 *     responses:
 *       201:
 *         description: Telefone criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Telefone'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             examples:
 *               campoObrigatorio:
 *                 value:
 *                   error: "Número, tipo, proprietário_tipo e proprietário_id são obrigatórios"
 *               numeroInvalido:
 *                 value:
 *                   error: "Formato de número de telefone inválido"
 *               dddInvalido:
 *                 value:
 *                   error: "DDD deve conter exatamente 2 dígitos"
 *               tipoInvalido:
 *                 value:
 *                   error: "Tipo de telefone inválido"
 *               proprietarioInvalido:
 *                 value:
 *                   error: "Tipo de proprietário inválido"
 *       404:
 *         description: Proprietário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Proprietário especificado não foi encontrado"
 *       409:
 *         description: Conflito - número já cadastrado para este proprietário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Este número já está cadastrado para este proprietário"
 *       500:
 *         description: Erro interno do servidor
 */
routerPhones.post("/", PhonesController.criar);

/**
 * @swagger
 * /telefones/{id}:
 *   put:
 *     summary: Atualiza um telefone existente
 *     description: Atualiza os dados de um telefone específico. Não é possível alterar o proprietário do telefone
 *     tags: [Telefones]
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
 *             $ref: '#/components/schemas/TelefoneUpdate'
 *     responses:
 *       200:
 *         description: Telefone atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneAtualizadoResponse'
 *       404:
 *         description: Telefone não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Telefone não encontrado"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             examples:
 *               numeroInvalido:
 *                 value:
 *                   error: "Formato de número de telefone inválido"
 *               dddInvalido:
 *                 value:
 *                   error: "DDD deve conter exatamente 2 dígitos"
 *               tipoInvalido:
 *                 value:
 *                   error: "Tipo de telefone inválido"
 *               principalConflito:
 *                 value:
 *                   error: "Já existe um telefone principal para este proprietário. Desative o outro primeiro"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Você não tem permissão para atualizar este telefone"
 *       409:
 *         description: Conflito - número já usado por outro registro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Este número já está cadastrado em outro registro"
 *       500:
 *         description: Erro interno do servidor
 */
routerPhones.put("/:id", PhonesController.atualizar);

/**
 * @swagger
 * /telefones/{id}:
 *   delete:
 *     summary: Remove um telefone
 *     description: Realiza a exclusão de um telefone através do seu ID. Telefones principais podem exigir que outro seja definido como principal antes da exclusão
 *     tags: [Telefones]
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
 *         description: Telefone removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneSuccessMessage'
 *             example:
 *               mensagem: "Telefone removido com sucesso"
 *       404:
 *         description: Telefone não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Telefone não encontrado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             example:
 *               error: "Você não tem permissão para remover este telefone"
 *       409:
 *         description: Conflito - telefone é o único ou principal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TelefoneError'
 *             examples:
 *               unicoTelefone:
 *                 value:
 *                   error: "Não é possível remover o único telefone cadastrado. Cadastre outro primeiro"
 *               telefonePrincipal:
 *                 value:
 *                   error: "Defina outro telefone como principal antes de remover este"
 *       500:
 *         description: Erro interno do servidor
 */
routerPhones.delete("/:id", PhonesController.deletar);

export default routerPhones;

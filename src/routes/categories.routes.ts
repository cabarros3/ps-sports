import express from "express";
import CategoriesController from "../controllers/CategoriesController.ts";

const routesCategories = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único da categoria (UUID gerado automaticamente)
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Nome da categoria
 *         min_age:
 *           type: integer
 *           description: Idade mínima da categoria
 *         max_age:
 *           type: integer
 *           description: Idade máxima da categoria
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         name: "Sub-12"
 *         min_age: 10
 *         max_age: 12
 *
 *     CategoryInput:
 *       type: object
 *       required:
 *         - name
 *         - min_age
 *         - max_age
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Nome da categoria
 *           minLength: 3
 *         min_age:
 *           type: integer
 *           description: Idade mínima
 *           minimum: 0
 *         max_age:
 *           type: integer
 *           description: Idade máxima
 *           minimum: 0
 *       example:
 *         name: "Sub-15"
 *         min_age: 13
 *         max_age: 15
 *
 *     CategoryUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 100
 *           minLength: 3
 *         min_age:
 *           type: integer
 *           minimum: 0
 *         max_age:
 *           type: integer
 *           minimum: 0
 *       example:
 *         name: "Sub-15 Avançado"
 *         min_age: 14
 *         max_age: 15
 *
 *     CategoryError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *         error:
 *           type: object
 *           description: Detalhes do erro
 *       example:
 *         message: "Categoria não encontrada"
 *
 *   tags:
 *     - name: Categories
 *       description: Gerenciamento de categorias de idade
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista completa com todas as categorias de idade cadastradas
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro ao listar categorias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Erro ao listar categorias"
 *               error: {}
 */
routesCategories.get("/", CategoriesController.listar);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Busca uma categoria por ID
 *     description: Retorna os dados de uma categoria específica através do seu UUID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da categoria
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Categoria não encontrada"
 *       500:
 *         description: Erro ao buscar categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Erro ao buscar categoria"
 *               error: {}
 */
routesCategories.get("/:id", CategoriesController.buscarPorId);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Cadastra uma nova categoria de idade no sistema. O ID (UUID) é gerado automaticamente
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             examples:
 *               camposObrigatorios:
 *                 value:
 *                   message: "Erro ao criar categoria"
 *                   error: "Nome, idade mínima e máxima são obrigatórios"
 *               idadeInvalida:
 *                 value:
 *                   message: "Erro ao criar categoria"
 *                   error: "Idade máxima deve ser maior que idade mínima"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Erro ao criar categoria"
 *               error: {}
 */
routesCategories.post("/", CategoriesController.criar);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     description: Atualiza os dados de uma categoria específica através do seu UUID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da categoria
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdate'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Categoria não encontrada"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Erro ao atualizar categoria"
 *               error: "Idade máxima deve ser maior que idade mínima"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Erro ao atualizar categoria"
 *               error: {}
 */
routesCategories.put("/:id", CategoriesController.atualizar);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     description: Realiza a exclusão permanente de uma categoria do sistema através do seu UUID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID da categoria a ser removida
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       204:
 *         description: Categoria removida com sucesso (sem conteúdo)
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Categoria não encontrada"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryError'
 *             example:
 *               message: "Erro ao deletar categoria"
 *               error: {}
 */
routesCategories.delete("/:id", CategoriesController.deletar);

export default routesCategories;

import express from "express";

const routesCategories = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da categoria
 *         nome:
 *           type: string
 *           description: Nome da categoria
 *         descricao:
 *           type: string
 *           description: Descrição detalhada da categoria
 *         ativa:
 *           type: boolean
 *           description: Indica se a categoria está ativa
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação da categoria
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: 1
 *         nome: "Tecnologia"
 *         descricao: "Cursos relacionados a tecnologia e programação"
 *         ativa: true
 *         created_at: "2024-01-15T10:30:00Z"
 *         updated_at: "2024-01-15T10:30:00Z"
 *
 *     CategoriaInput:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da categoria
 *           minLength: 3
 *           maxLength: 100
 *         descricao:
 *           type: string
 *           description: Descrição detalhada da categoria
 *           maxLength: 500
 *         ativa:
 *           type: boolean
 *           description: Indica se a categoria está ativa
 *           default: true
 *       example:
 *         nome: "Design Gráfico"
 *         descricao: "Cursos de design, edição de imagens e criatividade visual"
 *         ativa: true
 *
 *     CategoriaError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *       example:
 *         error: "Categoria não encontrada"
 *
 *     CategoriaSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Categoria removida com sucesso"
 *
 *     CategoriaAtualizadaResponse:
 *       type: object
 *       properties:
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *         mensagem:
 *           type: string
 *       example:
 *         categoria:
 *           id: 1
 *           nome: "Tecnologia Atualizada"
 *           descricao: "Cursos atualizados de tecnologia"
 *           ativa: true
 *           created_at: "2024-01-15T10:30:00Z"
 *           updated_at: "2024-01-16T14:20:00Z"
 *         mensagem: "Categoria atualizada com sucesso"
 *
 *   tags:
 *     - name: Categorias
 *       description: Gerenciamento de categorias de cursos
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista com todas as categorias cadastradas no sistema
 *     tags: [Categorias]
 *     parameters:
 *       - in: query
 *         name: ativa
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas categorias ativas ou inativas
 *         example: true
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Número máximo de resultados a retornar
 *         example: 10
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número da página para paginação
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             example:
 *               error: "Erro ao listar categorias"
 */
routesCategories.get("/", (req, res) => res.send("Listar categorias"));

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Busca uma categoria por ID
 *     description: Retorna os dados de uma categoria específica através do seu ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da categoria
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             example:
 *               error: "Categoria não encontrada"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             example:
 *               error: "ID deve ser um número inteiro válido"
 *       500:
 *         description: Erro interno do servidor
 */
routesCategories.get("/:id", (req, res) => res.send("Buscar categoria"));

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Cadastra uma nova categoria no sistema com nome, descrição e status
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Dados inválidos ou categoria já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             examples:
 *               campoObrigatorio:
 *                 value:
 *                   error: "O campo nome é obrigatório"
 *               categoriaExistente:
 *                 value:
 *                   error: "Já existe uma categoria com este nome"
 *       500:
 *         description: Erro interno do servidor
 */
routesCategories.post("/", (req, res) => res.send("Criar categoria"));

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     description: Atualiza os dados de uma categoria específica através do seu ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da categoria
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaAtualizadaResponse'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             example:
 *               error: "Categoria não encontrada"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             examples:
 *               dadosInvalidos:
 *                 value:
 *                   error: "Dados inválidos fornecidos"
 *               nomeExistente:
 *                 value:
 *                   error: "Já existe outra categoria com este nome"
 *       500:
 *         description: Erro interno do servidor
 */
routesCategories.put("/:id", (req, res) => res.send("Atualizar categoria"));

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     description: Realiza a exclusão de uma categoria através do seu ID. Categorias com cursos associados não podem ser removidas
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da categoria
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaSuccessMessage'
 *             example:
 *               mensagem: "Categoria removida com sucesso"
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             example:
 *               error: "Categoria não encontrada"
 *       409:
 *         description: Conflito - categoria possui cursos associados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaError'
 *             example:
 *               error: "Não é possível remover categoria com cursos associados"
 *       500:
 *         description: Erro interno do servidor
 */
routesCategories.delete("/:id", (req, res) => res.send("Deletar categoria"));

export default routesCategories;

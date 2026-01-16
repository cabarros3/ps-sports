import { Router } from "express";
import ModalitiesControllers from "../controllers/ModalitiesController.ts";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Modality:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da modalidade (auto-incrementado)
 *         name:
 *           type: string
 *           maxLength: 45
 *           description: Nome da modalidade esportiva
 *       example:
 *         id: 1
 *         name: "Futebol"
 *
 *     ModalityInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 45
 *           description: Nome da modalidade esportiva
 *           minLength: 3
 *       example:
 *         name: "Basquete"
 *
 *     ModalityUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 45
 *           minLength: 3
 *       example:
 *         name: "Voleibol"
 *
 *     ModalityError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *         error:
 *           type: object
 *           description: Detalhes do erro
 *       example:
 *         message: "Modalidade não encontrada"
 *
 *   tags:
 *     - name: Modalities
 *       description: Gerenciamento de modalidades esportivas
 */

/**
 * @swagger
 * /modalities:
 *   get:
 *     summary: Lista todas as modalidades
 *     description: Retorna uma lista completa com todas as modalidades esportivas cadastradas
 *     tags: [Modalities]
 *     responses:
 *       200:
 *         description: Lista de modalidades retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Modality'
 *       500:
 *         description: Erro ao listar modalidades
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Erro ao listar Modalidades"
 *               error: {}
 */
router.get("/", ModalitiesControllers.listar);

/**
 * @swagger
 * /modalities:
 *   post:
 *     summary: Cria uma nova modalidade
 *     description: Cadastra uma nova modalidade esportiva no sistema. O ID é gerado automaticamente
 *     tags: [Modalities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModalityInput'
 *     responses:
 *       201:
 *         description: Modalidade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modality'
 *       500:
 *         description: Erro ao criar modalidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Erro ao criar a Modalidade"
 *               error: {}
 */
router.post("/", ModalitiesControllers.criar);

/**
 * @swagger
 * /modalities/{id}:
 *   get:
 *     summary: Busca uma modalidade por ID
 *     description: Retorna os dados de uma modalidade específica através do seu ID
 *     tags: [Modalities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da modalidade
 *         example: 1
 *     responses:
 *       200:
 *         description: Modalidade encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modality'
 *       404:
 *         description: Modalidade não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Modalidade não encontrada"
 *       500:
 *         description: Erro ao buscar modalidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Erro ao buscar Modalidade"
 *               error: {}
 */
router.get("/:id", ModalitiesControllers.buscarPorId);

/**
 * @swagger
 * /modalities/{id}:
 *   put:
 *     summary: Atualiza uma modalidade existente
 *     description: Atualiza o nome de uma modalidade específica através do seu ID
 *     tags: [Modalities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da modalidade
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModalityUpdate'
 *     responses:
 *       200:
 *         description: Modalidade atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modality'
 *       404:
 *         description: Modalidade não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Modalidade não encontrada"
 *       500:
 *         description: Erro ao atualizar modalidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Erro ao atualizar a modalidade"
 *               error: {}
 */
router.put("/:id", ModalitiesControllers.atualizar);

/**
 * @swagger
 * /modalities/{id}:
 *   delete:
 *     summary: Remove uma modalidade
 *     description: Realiza a exclusão permanente de uma modalidade do sistema através do seu ID
 *     tags: [Modalities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da modalidade a ser removida
 *         example: 1
 *     responses:
 *       204:
 *         description: Modalidade removida com sucesso (sem conteúdo)
 *       404:
 *         description: Modalidade não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Modalidade não encontrada"
 *       500:
 *         description: Erro ao deletar modalidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModalityError'
 *             example:
 *               message: "Erro ao deletar Modalidade"
 *               error: {}
 */
router.delete("/:id", ModalitiesControllers.deletar);

export default router;

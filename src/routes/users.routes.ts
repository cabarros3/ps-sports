import express from "express";

const routerUsers = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do usuário
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do usuário
 *         senha:
 *           type: string
 *           format: password
 *           description: Senha do usuário (retornada apenas em hash)
 *         tipo:
 *           type: string
 *           enum: [admin, professor, aluno]
 *           description: Tipo/perfil do usuário no sistema
 *         ativo:
 *           type: boolean
 *           description: Indica se o usuário está ativo
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL da foto de perfil do usuário
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *       example:
 *         id: 1
 *         nome: "Maria Silva"
 *         email: "maria.silva@example.com"
 *         tipo: "professor"
 *         ativo: true
 *         avatar: "https://example.com/avatars/maria.jpg"
 *         created_at: "2024-01-15T10:30:00Z"
 *         updated_at: "2024-01-15T10:30:00Z"
 *
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *         - tipo
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *           minLength: 3
 *           maxLength: 150
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do usuário
 *         senha:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *           minLength: 8
 *         tipo:
 *           type: string
 *           enum: [admin, professor, aluno]
 *           description: Tipo/perfil do usuário
 *         ativo:
 *           type: boolean
 *           description: Status do usuário
 *           default: true
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL da foto de perfil
 *       example:
 *         nome: "João Santos"
 *         email: "joao.santos@example.com"
 *         senha: "senhaSegura123"
 *         tipo: "aluno"
 *         ativo: true
 *         avatar: "https://example.com/avatars/joao.jpg"
 *
 *     UsuarioUpdate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *           minLength: 3
 *           maxLength: 150
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do usuário
 *         senha:
 *           type: string
 *           format: password
 *           description: Nova senha do usuário (opcional)
 *           minLength: 8
 *         tipo:
 *           type: string
 *           enum: [admin, professor, aluno]
 *           description: Tipo/perfil do usuário
 *         ativo:
 *           type: boolean
 *           description: Status do usuário
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL da foto de perfil
 *       example:
 *         nome: "João Santos Atualizado"
 *         email: "joao.novo@example.com"
 *         ativo: true
 *
 *     UsuarioError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *       example:
 *         error: "Usuário não encontrado"
 *
 *     UsuarioSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Usuário removido com sucesso"
 *
 *     UsuarioAtualizadoResponse:
 *       type: object
 *       properties:
 *         usuario:
 *           $ref: '#/components/schemas/Usuario'
 *         mensagem:
 *           type: string
 *       example:
 *         usuario:
 *           id: 1
 *           nome: "Maria Silva Atualizada"
 *           email: "maria.nova@example.com"
 *           tipo: "professor"
 *           ativo: true
 *           avatar: "https://example.com/avatars/maria-novo.jpg"
 *           created_at: "2024-01-15T10:30:00Z"
 *           updated_at: "2024-01-16T14:20:00Z"
 *         mensagem: "Usuário atualizado com sucesso"
 *
 *   tags:
 *     - name: Usuarios
 *       description: Gerenciamento de usuários do sistema
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista com todos os usuários cadastrados no sistema
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [admin, professor, aluno]
 *         description: Filtrar usuários por tipo/perfil
 *         example: professor
 *       - in: query
 *         name: ativo
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas usuários ativos ou inativos
 *         example: true
 *       - in: query
 *         name: busca
 *         schema:
 *           type: string
 *         description: Buscar por nome ou email
 *         example: "maria"
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Número máximo de resultados a retornar
 *         example: 20
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número da página para paginação
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *                 total:
 *                   type: integer
 *                   description: Total de usuários encontrados
 *                 pagina:
 *                   type: integer
 *                   description: Página atual
 *                 totalPaginas:
 *                   type: integer
 *                   description: Total de páginas
 *       401:
 *         description: Não autorizado - token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Token de autenticação inválido"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Erro ao listar usuários"
 */
routerUsers.get("/", (req, res) => res.send("Listar usuários"));

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     description: Retorna os dados de um usuário específico através do seu ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Usuário não encontrado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Acesso não autorizado"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "ID deve ser um número inteiro válido"
 *       500:
 *         description: Erro interno do servidor
 */
routerUsers.get("/:id", (req, res) => res.send("Buscar usuário"));

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cadastra um novo usuário no sistema com nome, email, senha e tipo de perfil
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             examples:
 *               campoObrigatorio:
 *                 value:
 *                   error: "Todos os campos obrigatórios devem ser preenchidos"
 *               emailInvalido:
 *                 value:
 *                   error: "Formato de email inválido"
 *               senhaFraca:
 *                 value:
 *                   error: "A senha deve ter no mínimo 8 caracteres"
 *       409:
 *         description: Conflito - email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Este email já está cadastrado"
 *       500:
 *         description: Erro interno do servidor
 */
routerUsers.post("/", (req, res) => res.send("Criar usuário"));

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     description: Atualiza os dados de um usuário específico através do seu ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do usuário
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioAtualizadoResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Usuário não encontrado"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             examples:
 *               emailInvalido:
 *                 value:
 *                   error: "Formato de email inválido"
 *               senhaFraca:
 *                 value:
 *                   error: "A senha deve ter no mínimo 8 caracteres"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Você não tem permissão para atualizar este usuário"
 *       409:
 *         description: Conflito - email já cadastrado para outro usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Este email já está sendo usado por outro usuário"
 *       500:
 *         description: Erro interno do servidor
 */
routerUsers.put("/:id", (req, res) => res.send("Atualizar usuário"));

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     description: Realiza a exclusão de um usuário através do seu ID. Usuários com dependências ativas (matrículas, cursos) podem não ser removidos
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioSuccessMessage'
 *             example:
 *               mensagem: "Usuário removido com sucesso"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Usuário não encontrado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             example:
 *               error: "Você não tem permissão para remover este usuário"
 *       409:
 *         description: Conflito - usuário possui dependências ativas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioError'
 *             examples:
 *               professorComCursos:
 *                 value:
 *                   error: "Não é possível remover professor com cursos ativos"
 *               alunoComMatriculas:
 *                 value:
 *                   error: "Não é possível remover aluno com matrículas ativas"
 *       500:
 *         description: Erro interno do servidor
 */
routerUsers.delete("/:id", (req, res) => res.send("Deletar usuário"));

export default routerUsers;

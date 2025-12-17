import express from "express";

const routerLeads = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lead:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do lead
 *         nome:
 *           type: string
 *           description: Nome completo do lead
 *         email:
 *           type: string
 *           format: email
 *           description: Email do lead
 *         telefone:
 *           type: string
 *           description: Telefone de contato
 *         empresa:
 *           type: string
 *           description: Nome da empresa do lead
 *         cargo:
 *           type: string
 *           description: Cargo do lead na empresa
 *         origem:
 *           type: string
 *           enum: [site, landing_page, rede_social, indicacao, evento, email_marketing, outro]
 *           description: Origem de captação do lead
 *         status:
 *           type: string
 *           enum: [novo, contatado, qualificado, proposta, negociacao, ganho, perdido]
 *           description: Status atual do lead no funil de vendas
 *         interesse:
 *           type: string
 *           description: Curso ou produto de interesse do lead
 *         observacoes:
 *           type: string
 *           description: Observações e anotações sobre o lead
 *         pontuacao:
 *           type: integer
 *           description: Pontuação de qualificação do lead (lead scoring)
 *           minimum: 0
 *           maximum: 100
 *         data_primeiro_contato:
 *           type: string
 *           format: date-time
 *           description: Data do primeiro contato com o lead
 *         data_ultima_interacao:
 *           type: string
 *           format: date-time
 *           description: Data da última interação com o lead
 *         responsavel_id:
 *           type: integer
 *           description: ID do usuário responsável pelo lead
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
 *         nome: "Carlos Oliveira"
 *         email: "carlos.oliveira@empresa.com"
 *         telefone: "+55 81 99999-8888"
 *         empresa: "Tech Solutions LTDA"
 *         cargo: "Gerente de TI"
 *         origem: "landing_page"
 *         status: "qualificado"
 *         interesse: "Curso de AWS e Cloud Computing"
 *         observacoes: "Interessado em treinamento corporativo para equipe de 10 pessoas"
 *         pontuacao: 85
 *         data_primeiro_contato: "2024-01-15T10:30:00Z"
 *         data_ultima_interacao: "2024-01-20T14:45:00Z"
 *         responsavel_id: 5
 *         created_at: "2024-01-15T10:30:00Z"
 *         updated_at: "2024-01-20T14:45:00Z"
 *
 *     LeadInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do lead
 *           minLength: 3
 *           maxLength: 150
 *         email:
 *           type: string
 *           format: email
 *           description: Email do lead
 *         telefone:
 *           type: string
 *           description: Telefone de contato
 *           pattern: '^\+?[1-9]\d{1,14}$'
 *         empresa:
 *           type: string
 *           description: Nome da empresa do lead
 *           maxLength: 150
 *         cargo:
 *           type: string
 *           description: Cargo do lead na empresa
 *           maxLength: 100
 *         origem:
 *           type: string
 *           enum: [site, landing_page, rede_social, indicacao, evento, email_marketing, outro]
 *           description: Origem de captação do lead
 *           default: site
 *         status:
 *           type: string
 *           enum: [novo, contatado, qualificado, proposta, negociacao, ganho, perdido]
 *           description: Status atual do lead
 *           default: novo
 *         interesse:
 *           type: string
 *           description: Curso ou produto de interesse
 *           maxLength: 200
 *         observacoes:
 *           type: string
 *           description: Observações sobre o lead
 *           maxLength: 1000
 *         pontuacao:
 *           type: integer
 *           description: Pontuação de qualificação (0-100)
 *           minimum: 0
 *           maximum: 100
 *           default: 0
 *         responsavel_id:
 *           type: integer
 *           description: ID do responsável pelo lead
 *       example:
 *         nome: "Ana Paula Costa"
 *         email: "ana.costa@startup.com"
 *         telefone: "+55 81 98888-7777"
 *         empresa: "StartupXYZ"
 *         cargo: "CEO"
 *         origem: "evento"
 *         status: "novo"
 *         interesse: "Programa de Aceleração Empresarial"
 *         observacoes: "Conheceu a empresa no evento TechWeek 2024"
 *         pontuacao: 70
 *         responsavel_id: 3
 *
 *     LeadUpdate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do lead
 *           minLength: 3
 *           maxLength: 150
 *         email:
 *           type: string
 *           format: email
 *           description: Email do lead
 *         telefone:
 *           type: string
 *           description: Telefone de contato
 *         empresa:
 *           type: string
 *           description: Nome da empresa
 *         cargo:
 *           type: string
 *           description: Cargo na empresa
 *         origem:
 *           type: string
 *           enum: [site, landing_page, rede_social, indicacao, evento, email_marketing, outro]
 *         status:
 *           type: string
 *           enum: [novo, contatado, qualificado, proposta, negociacao, ganho, perdido]
 *         interesse:
 *           type: string
 *           description: Interesse do lead
 *         observacoes:
 *           type: string
 *           description: Observações
 *         pontuacao:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *         responsavel_id:
 *           type: integer
 *           description: ID do responsável
 *       example:
 *         status: "contatado"
 *         observacoes: "Primeiro contato realizado. Demonstrou interesse em reunião"
 *         pontuacao: 75
 *         data_ultima_interacao: "2024-01-21T09:15:00Z"
 *
 *     LeadError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
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
 *     LeadAtualizadoResponse:
 *       type: object
 *       properties:
 *         lead:
 *           $ref: '#/components/schemas/Lead'
 *         mensagem:
 *           type: string
 *       example:
 *         lead:
 *           id: 1
 *           nome: "Carlos Oliveira"
 *           email: "carlos.oliveira@empresa.com"
 *           status: "proposta"
 *           pontuacao: 90
 *           observacoes: "Proposta comercial enviada. Aguardando retorno"
 *           created_at: "2024-01-15T10:30:00Z"
 *           updated_at: "2024-01-22T16:30:00Z"
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
 *     description: Retorna uma lista com todos os leads cadastrados no sistema, com opções de filtro e ordenação
 *     tags: [Leads]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [novo, contatado, qualificado, proposta, negociacao, ganho, perdido]
 *         description: Filtrar leads por status
 *         example: qualificado
 *       - in: query
 *         name: origem
 *         schema:
 *           type: string
 *           enum: [site, landing_page, rede_social, indicacao, evento, email_marketing, outro]
 *         description: Filtrar leads por origem
 *         example: landing_page
 *       - in: query
 *         name: responsavel_id
 *         schema:
 *           type: integer
 *         description: Filtrar leads por responsável
 *         example: 5
 *       - in: query
 *         name: pontuacao_min
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *         description: Pontuação mínima para filtro
 *         example: 70
 *       - in: query
 *         name: data_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial para filtro de criação
 *         example: "2024-01-01"
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final para filtro de criação
 *         example: "2024-01-31"
 *       - in: query
 *         name: busca
 *         schema:
 *           type: string
 *         description: Buscar por nome, email ou empresa
 *         example: "carlos"
 *       - in: query
 *         name: ordenar_por
 *         schema:
 *           type: string
 *           enum: [created_at, updated_at, pontuacao, nome]
 *         description: Campo para ordenação
 *         example: pontuacao
 *       - in: query
 *         name: ordem
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Ordem de classificação
 *         example: desc
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Número máximo de resultados
 *         example: 20
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número da página
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de leads retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 leads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lead'
 *                 total:
 *                   type: integer
 *                   description: Total de leads encontrados
 *                 pagina:
 *                   type: integer
 *                   description: Página atual
 *                 totalPaginas:
 *                   type: integer
 *                   description: Total de páginas
 *                 estatisticas:
 *                   type: object
 *                   properties:
 *                     por_status:
 *                       type: object
 *                       description: Contagem de leads por status
 *                     pontuacao_media:
 *                       type: number
 *                       description: Pontuação média dos leads
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Token de autenticação inválido"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Erro ao listar leads"
 */
routerLeads.get("/", (req, res) => res.send("Listar leads"));

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Busca um lead por ID
 *     description: Retorna os dados completos de um lead específico através do seu ID
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do lead
 *         example: 1
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
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Acesso não autorizado"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "ID deve ser um número inteiro válido"
 *       500:
 *         description: Erro interno do servidor
 */
routerLeads.get("/:id", (req, res) => res.send("Buscar lead"));

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Cria um novo lead
 *     description: Cadastra um novo lead no sistema com informações de contato, origem e interesse
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
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             examples:
 *               campoObrigatorio:
 *                 value:
 *                   error: "Nome e email são campos obrigatórios"
 *               emailInvalido:
 *                 value:
 *                   error: "Formato de email inválido"
 *               telefoneInvalido:
 *                 value:
 *                   error: "Formato de telefone inválido"
 *               pontuacaoInvalida:
 *                 value:
 *                   error: "Pontuação deve estar entre 0 e 100"
 *       409:
 *         description: Conflito - lead com este email já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Já existe um lead cadastrado com este email"
 *       500:
 *         description: Erro interno do servidor
 */
routerLeads.post("/", (req, res) => res.send("Criar lead"));

/**
 * @swagger
 * /leads/{id}:
 *   put:
 *     summary: Atualiza um lead existente
 *     description: Atualiza os dados de um lead específico, incluindo status, pontuação e observações do funil de vendas
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do lead
 *         example: 1
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
 *               $ref: '#/components/schemas/LeadAtualizadoResponse'
 *       404:
 *         description: Lead não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Lead não encontrado"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             examples:
 *               emailInvalido:
 *                 value:
 *                   error: "Formato de email inválido"
 *               statusInvalido:
 *                 value:
 *                   error: "Status inválido"
 *               pontuacaoInvalida:
 *                 value:
 *                   error: "Pontuação deve estar entre 0 e 100"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Você não tem permissão para atualizar este lead"
 *       409:
 *         description: Conflito - email já usado por outro lead
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Este email já está sendo usado por outro lead"
 *       500:
 *         description: Erro interno do servidor
 */
routerLeads.put("/:id", (req, res) => res.send("Atualizar lead"));

/**
 * @swagger
 * /leads/{id}:
 *   delete:
 *     summary: Remove um lead
 *     description: Realiza a exclusão de um lead através do seu ID. Leads com histórico de interações extenso podem ser arquivados ao invés de removidos
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do lead
 *         example: 1
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
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Você não tem permissão para remover este lead"
 *       409:
 *         description: Conflito - lead possui histórico que deve ser arquivado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadError'
 *             example:
 *               error: "Lead possui histórico extenso. Considere arquivar ao invés de remover"
 *       500:
 *         description: Erro interno do servidor
 */
routerLeads.delete("/:id", (req, res) => res.send("Deletar lead"));

export default routerLeads;

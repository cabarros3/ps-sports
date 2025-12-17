import express from "express";
const routerPlayers = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Jogador:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do jogador
 *         nome:
 *           type: string
 *           description: Nome do jogador ou nickname
 *         email:
 *           type: string
 *           format: email
 *           description: Email do jogador
 *         nickname:
 *           type: string
 *           description: Apelido/username único do jogador
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL do avatar do jogador
 *         nivel:
 *           type: integer
 *           description: Nível atual do jogador
 *           minimum: 1
 *         experiencia:
 *           type: integer
 *           description: Pontos de experiência acumulados
 *           minimum: 0
 *         pontuacao_total:
 *           type: integer
 *           description: Pontuação total acumulada
 *           minimum: 0
 *         moedas:
 *           type: integer
 *           description: Moedas virtuais do jogador
 *           minimum: 0
 *         vitorias:
 *           type: integer
 *           description: Total de vitórias
 *           minimum: 0
 *         derrotas:
 *           type: integer
 *           description: Total de derrotas
 *           minimum: 0
 *         empates:
 *           type: integer
 *           description: Total de empates
 *           minimum: 0
 *         rank:
 *           type: string
 *           enum: [bronze, prata, ouro, platina, diamante, mestre, grao_mestre, lendario]
 *           description: Ranking do jogador
 *         status:
 *           type: string
 *           enum: [online, offline, em_jogo, ausente]
 *           description: Status atual do jogador
 *         ultimo_acesso:
 *           type: string
 *           format: date-time
 *           description: Data e hora do último acesso
 *         data_cadastro:
 *           type: string
 *           format: date-time
 *           description: Data de cadastro do jogador
 *         ativo:
 *           type: boolean
 *           description: Indica se a conta está ativa
 *         banido:
 *           type: boolean
 *           description: Indica se o jogador foi banido
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
 *         nome: "Carlos Silva"
 *         email: "carlos.silva@example.com"
 *         nickname: "DragonSlayer99"
 *         avatar: "https://example.com/avatars/dragon99.png"
 *         nivel: 42
 *         experiencia: 125000
 *         pontuacao_total: 89500
 *         moedas: 5420
 *         vitorias: 156
 *         derrotas: 89
 *         empates: 12
 *         rank: "platina"
 *         status: "online"
 *         ultimo_acesso: "2024-01-20T15:30:00Z"
 *         data_cadastro: "2023-06-15T10:00:00Z"
 *         ativo: true
 *         banido: false
 *         created_at: "2023-06-15T10:00:00Z"
 *         updated_at: "2024-01-20T15:30:00Z"
 *
 *     JogadorInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - nickname
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do jogador
 *           minLength: 3
 *           maxLength: 100
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do jogador
 *         nickname:
 *           type: string
 *           description: Nickname único do jogador
 *           minLength: 3
 *           maxLength: 30
 *           pattern: '^[a-zA-Z0-9_-]+$'
 *         senha:
 *           type: string
 *           format: password
 *           description: Senha da conta
 *           minLength: 8
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL do avatar
 *         nivel:
 *           type: integer
 *           description: Nível inicial (padrão 1)
 *           default: 1
 *         rank:
 *           type: string
 *           enum: [bronze, prata, ouro, platina, diamante, mestre, grao_mestre, lendario]
 *           default: bronze
 *       example:
 *         nome: "Maria Santos"
 *         email: "maria.santos@example.com"
 *         nickname: "PhoenixRising"
 *         senha: "senhaSegura123"
 *         avatar: "https://example.com/avatars/phoenix.png"
 *
 *     JogadorUpdate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *         email:
 *           type: string
 *           format: email
 *         nickname:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           pattern: '^[a-zA-Z0-9_-]+$'
 *         senha:
 *           type: string
 *           format: password
 *           minLength: 8
 *         avatar:
 *           type: string
 *           format: uri
 *         nivel:
 *           type: integer
 *           minimum: 1
 *         experiencia:
 *           type: integer
 *           minimum: 0
 *         moedas:
 *           type: integer
 *           minimum: 0
 *         rank:
 *           type: string
 *           enum: [bronze, prata, ouro, platina, diamante, mestre, grao_mestre, lendario]
 *         status:
 *           type: string
 *           enum: [online, offline, em_jogo, ausente]
 *         ativo:
 *           type: boolean
 *         banido:
 *           type: boolean
 *       example:
 *         nivel: 43
 *         experiencia: 127500
 *         moedas: 5620
 *         rank: "diamante"
 *         status: "em_jogo"
 *
 *     JogadorError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *       example:
 *         error: "Jogador não encontrado"
 *
 *     JogadorSuccessMessage:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           description: Mensagem de sucesso
 *       example:
 *         mensagem: "Jogador removido com sucesso"
 *
 *     JogadorAtualizadoResponse:
 *       type: object
 *       properties:
 *         jogador:
 *           $ref: '#/components/schemas/Jogador'
 *         mensagem:
 *           type: string
 *       example:
 *         jogador:
 *           id: 1
 *           nome: "Carlos Silva"
 *           nickname: "DragonSlayer99"
 *           nivel: 43
 *           experiencia: 127500
 *           rank: "diamante"
 *           vitorias: 157
 *           updated_at: "2024-01-21T10:15:00Z"
 *         mensagem: "Jogador atualizado com sucesso"
 *
 *     JogadorEstatisticas:
 *       type: object
 *       properties:
 *         jogador_id:
 *           type: integer
 *         total_partidas:
 *           type: integer
 *         taxa_vitoria:
 *           type: number
 *           format: float
 *           description: Percentual de vitórias
 *         sequencia_vitorias:
 *           type: integer
 *           description: Sequência atual de vitórias
 *         melhor_sequencia:
 *           type: integer
 *           description: Melhor sequência de vitórias
 *         tempo_jogado:
 *           type: integer
 *           description: Tempo total jogado em minutos
 *         conquistas:
 *           type: integer
 *           description: Total de conquistas desbloqueadas
 *       example:
 *         jogador_id: 1
 *         total_partidas: 257
 *         taxa_vitoria: 60.7
 *         sequencia_vitorias: 5
 *         melhor_sequencia: 12
 *         tempo_jogado: 15840
 *         conquistas: 34
 *
 *   tags:
 *     - name: Jogadores
 *       description: Gerenciamento de jogadores e perfis de usuário
 */

/**
 * @swagger
 * /jogadores:
 *   get:
 *     summary: Lista todos os jogadores
 *     description: Retorna uma lista com todos os jogadores cadastrados, com opções de filtro, ordenação e busca
 *     tags: [Jogadores]
 *     parameters:
 *       - in: query
 *         name: rank
 *         schema:
 *           type: string
 *           enum: [bronze, prata, ouro, platina, diamante, mestre, grao_mestre, lendario]
 *         description: Filtrar jogadores por rank
 *         example: platina
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [online, offline, em_jogo, ausente]
 *         description: Filtrar por status atual
 *         example: online
 *       - in: query
 *         name: nivel_min
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Nível mínimo
 *         example: 30
 *       - in: query
 *         name: nivel_max
 *         schema:
 *           type: integer
 *         description: Nível máximo
 *         example: 50
 *       - in: query
 *         name: ativo
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas jogadores ativos
 *         example: true
 *       - in: query
 *         name: banido
 *         schema:
 *           type: boolean
 *         description: Incluir/excluir jogadores banidos
 *         example: false
 *       - in: query
 *         name: busca
 *         schema:
 *           type: string
 *         description: Buscar por nome ou nickname
 *         example: "Dragon"
 *       - in: query
 *         name: ordenar_por
 *         schema:
 *           type: string
 *           enum: [nivel, pontuacao_total, vitorias, data_cadastro, ultimo_acesso]
 *         description: Campo para ordenação
 *         example: pontuacao_total
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
 *         description: Lista de jogadores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jogadores:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Jogador'
 *                 total:
 *                   type: integer
 *                   description: Total de jogadores encontrados
 *                 pagina:
 *                   type: integer
 *                   description: Página atual
 *                 totalPaginas:
 *                   type: integer
 *                   description: Total de páginas
 *                 estatisticas:
 *                   type: object
 *                   properties:
 *                     total_online:
 *                       type: integer
 *                     por_rank:
 *                       type: object
 *                       description: Contagem de jogadores por rank
 *                     nivel_medio:
 *                       type: number
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Token de autenticação inválido"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Erro ao listar jogadores"
 */
routerPlayers.get("/", (req, res) => res.send("Listar jogadores"));

/**
 * @swagger
 * /jogadores/{id}:
 *   get:
 *     summary: Busca um jogador por ID
 *     description: Retorna os dados completos de um jogador específico, incluindo estatísticas
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do jogador
 *         example: 1
 *       - in: query
 *         name: incluir_estatisticas
 *         schema:
 *           type: boolean
 *         description: Incluir estatísticas detalhadas do jogador
 *         example: true
 *     responses:
 *       200:
 *         description: Jogador encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jogador:
 *                   $ref: '#/components/schemas/Jogador'
 *                 estatisticas:
 *                   $ref: '#/components/schemas/JogadorEstatisticas'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Jogador não encontrado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Acesso não autorizado"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "ID deve ser um número inteiro válido"
 *       500:
 *         description: Erro interno do servidor
 */
routerPlayers.get("/:id", (req, res) => res.send("Buscar jogador"));

/**
 * @swagger
 * /jogadores:
 *   post:
 *     summary: Cria um novo jogador
 *     description: Cadastra um novo jogador no sistema com nome, email e nickname únicos
 *     tags: [Jogadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JogadorInput'
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             examples:
 *               campoObrigatorio:
 *                 value:
 *                   error: "Nome, email e nickname são campos obrigatórios"
 *               emailInvalido:
 *                 value:
 *                   error: "Formato de email inválido"
 *               nicknameInvalido:
 *                 value:
 *                   error: "Nickname deve conter apenas letras, números, hífens e underscores"
 *               nicknameCurto:
 *                 value:
 *                   error: "Nickname deve ter no mínimo 3 caracteres"
 *               senhaFraca:
 *                 value:
 *                   error: "A senha deve ter no mínimo 8 caracteres"
 *       409:
 *         description: Conflito - email ou nickname já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             examples:
 *               emailDuplicado:
 *                 value:
 *                   error: "Este email já está cadastrado"
 *               nicknameDuplicado:
 *                 value:
 *                   error: "Este nickname já está em uso"
 *       500:
 *         description: Erro interno do servidor
 */
routerPlayers.post("/", (req, res) => res.send("Criar jogador"));

/**
 * @swagger
 * /jogadores/{id}:
 *   put:
 *     summary: Atualiza um jogador existente
 *     description: Atualiza os dados de um jogador, incluindo progressão, estatísticas e status
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do jogador
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JogadorUpdate'
 *     responses:
 *       200:
 *         description: Jogador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorAtualizadoResponse'
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Jogador não encontrado"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             examples:
 *               emailInvalido:
 *                 value:
 *                   error: "Formato de email inválido"
 *               nicknameInvalido:
 *                 value:
 *                   error: "Formato de nickname inválido"
 *               nivelInvalido:
 *                 value:
 *                   error: "Nível deve ser maior ou igual a 1"
 *               experienciaInvalida:
 *                 value:
 *                   error: "Experiência não pode ser negativa"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Você não tem permissão para atualizar este jogador"
 *       409:
 *         description: Conflito - email ou nickname já usado por outro jogador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             examples:
 *               emailConflito:
 *                 value:
 *                   error: "Este email já está sendo usado por outro jogador"
 *               nicknameConflito:
 *                 value:
 *                   error: "Este nickname já está em uso por outro jogador"
 *       500:
 *         description: Erro interno do servidor
 */
routerPlayers.put("/:id", (req, res) => res.send("Atualizar jogador"));

/**
 * @swagger
 * /jogadores/{id}:
 *   delete:
 *     summary: Remove um jogador
 *     description: Realiza a exclusão de um jogador através do seu ID. Jogadores com histórico extenso podem ser desativados ao invés de removidos
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do jogador
 *         example: 1
 *       - in: query
 *         name: remover_dados
 *         schema:
 *           type: boolean
 *         description: Se true, remove todos os dados. Se false, apenas desativa a conta
 *         example: false
 *     responses:
 *       200:
 *         description: Jogador removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorSuccessMessage'
 *             examples:
 *               removido:
 *                 value:
 *                   mensagem: "Jogador removido com sucesso"
 *               desativado:
 *                 value:
 *                   mensagem: "Conta do jogador desativada com sucesso"
 *       404:
 *         description: Jogador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Jogador não encontrado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             example:
 *               error: "Você não tem permissão para remover este jogador"
 *       409:
 *         description: Conflito - jogador possui dados que devem ser preservados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogadorError'
 *             examples:
 *               historicoExtensivo:
 *                 value:
 *                   error: "Jogador possui histórico extenso. Considere desativar ao invés de remover"
 *               partidasAtivas:
 *                 value:
 *                   error: "Não é possível remover jogador com partidas em andamento"
 *       500:
 *         description: Erro interno do servidor
 */
routerPlayers.delete("/:id", (req, res) => res.send("Deletar jogador"));

export default routerPlayers;

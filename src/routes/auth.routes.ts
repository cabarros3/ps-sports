import express from "express";
import { AuthController } from "../controllers/AuthControlle.ts";
// import { AuthController } from "../controllers/AuthController.ts";
const routerAuth = express.Router();
/**
* @swagger
* components:
*
*
schemas:
LoginInput:
*type: object
*required:
*- email
*- password
*properties:
*email:
*type: string
*format: email
*
*
description: Email do usuário
password:
*type: string
*format: password
*
*
description: Senha do usuário
example:
*email: "usuario@exemplo.com"
*password: "senha123"
*
*LoginResponse:
*type: object
*properties:
*user:
*type: object
*properties:
*
id:
*type: string
*format: uuid
*
*
*
*
*
*
*
*
name:
type: string
email:
type: string
status:
type: string
token:
type: string*
description: JWT token para autenticação
*refreshToken:
*type: string
*description: Token para renovar a autenticação
*
expiresIn:
*type: string
*description: Tempo de expiração do token
*example:
*user:
*id: "550e8400-e29b-41d4-a716-446655440000"
*name: "João Silva"
*email: "joao.silva@example.com"
*
status: "Ativo"
*token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*refreshToken: "a7e3f53c-d9a0-4eb9-96d8-c50ca0e5..."
*expiresIn: "1h"
*
*RefreshTokenInput:
*type: object
*required:
*
*
- refreshToken
properties:
*refreshToken:
*type: string
*description: Token de atualização obtido no login
*
*
example:
refreshToken: "a7e3f53c-d9a0-4eb9-96d8-c50ca0e5..."
*
*
RefreshTokenResponse:
*type: object
*properties:
*token:
*type: string
*description: Novo JWT token
*refreshToken:
*type: string
*
*
description: Novo token de atualização
expiresIn:
*type: string
*description: Tempo de expiração do token
*
example:
*token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*refreshToken: "b8f4e62d-e5a1-5fc9-07e9-d61db1f6..."
*expiresIn: "1h"
*
*
LogoutInput:*type: object
*required:
*
*
- refreshToken
properties:
*refreshToken:
*type: string
*description: Token de atualização a ser invalidado
*
example:
*
refreshToken: "a7e3f53c-d9a0-4eb9-96d8-c50ca0e5..."
*
*LogoutResponse:
*type: object
*properties:
*message:
*type: string
*description: Mensagem de confirmação
*
example:
*
message: "Logout realizado com sucesso"
*/
/**
* @swagger
* /auth/login:
*
post:
*summary: Autentica um usuário
*description: Valida as credenciais do usuário e retorna um token JWT
*tags: [Auth]
*requestBody:
*required: true
*content:
*
*
application/json:
schema:
*
$ref: '#/components/schemas/LoginInput'
*responses:
*200:
*description: Login realizado com sucesso
*content:
*
application/json:
*
schema:
*
*
$ref: '#/components/schemas/LoginResponse'
400:
*description: Dados inválidos
*content:
*
*
*
application/json:
schema:
type: object*properties:
*message:
*
type: string
*
example:
*
*
message: "Email e senha são obrigatórios"
401:
*description: Credenciais inválidas
*content:
*
application/json:
*
schema:
*type: object
*properties:
*message:
*
type: string
*
examples:
*
credenciaisInvalidas:
*
value:
*
message: "Email ou senha incorretos"
*
usuarioInativo:
*
value:
*
*
message: "Usuário inativo. Contate o administrador."
500:
*
description: Erro interno do servidor
*/
routerAuth.post("/login", AuthController.login);
/**
* @swagger
* /auth/refresh-token:
*
post:
*summary: Renova o token de autenticação
*description: Utiliza um refresh token para gerar um novo token JWT
sem necessidade de login
*tags: [Auth]
*requestBody:
*required: true
*content:
*
*
application/json:
schema:
*
$ref: '#/components/schemas/RefreshTokenInput'
*responses:
*200:
*description: Token renovado com sucesso
*content:
*
*
application/json:
schema:*
*
$ref: '#/components/schemas/RefreshTokenResponse'
400:
*description: Dados inválidos
*content:
*
application/json:
*
schema:
*type: object
*properties:
*message:
*
type: string
*
example:
*
*
message: "Refresh token é obrigatório"
401:
*description: Token inválido ou expirado
*content:
*
application/json:
*
schema:
*type: object
*properties:
*message:
*
type: string
*
examples:
*
tokenInvalido:
*
value:
*
message: "Refresh token inválido"
*
tokenExpirado:
*
value:
*
message: "Refresh token expirado"
*
usuarioInvalido:
*
value:
*
*
message: "Usuário inválido ou inativo"
500:
*
description: Erro interno do servidor
*/
routerAuth.post("/refresh-token", AuthController.refreshToken);
/**
* @swagger
* /auth/logout:
*
post:
*summary: Realiza logout do usuário
*description: Invalida o refresh token do usuário
*tags: [Auth]
*requestBody:
*required: true
*content:*
*
application/json:
schema:
*
$ref: '#/components/schemas/LogoutInput'
*responses:
*200:
*description: Logout realizado com sucesso
*content:
*
application/json:
*
schema:
*
*
$ref: '#/components/schemas/LogoutResponse'
400:
*description: Dados inválidos
*content:
*
application/json:
*
schema:
*type: object
*properties:
*message:
*
type: string
*
example:
*
*
*
message: "Refresh token é obrigatório"
500:
description: Erro interno do servidor
*/
routerAuth.post("/logout", AuthController.logout);
export default routerAuth;

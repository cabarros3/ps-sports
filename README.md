# PS Sport's - Backend

📌 Descrição do Projeto

A PS Sport’s é uma escola de futebol que atualmente adota um modelo de gestão manual, baseado em registros em cadernos, para o controle administrativo, acadêmico e financeiro. Com a expansão de suas atividades e o aumento no volume de informações, tornou-se evidente a necessidade de uma solução digital que otimize esses processos.

O projeto tem como objetivo o desenvolvimento de um sistema de gestão capaz de centralizar e organizar dados relacionados a alunos, turmas, treinadores, responsáveis, finanças, produtos e serviços oferecidos pela instituição.

O sistema é destinado a diferentes perfis de usuários, incluindo administradores, equipe financeira, treinadores e responsáveis pelos alunos, garantindo que cada perfil tenha acesso apenas às funcionalidades compatíveis com suas atribuições.

A adoção dessa solução digital busca melhorar a organização interna, reduzir erros operacionais, especialmente os relacionados a pagamentos, além de evitar constrangimentos e retrabalhos. O sistema também visa assegurar que todas as informações estejam centralizadas, seguras e facilmente acessíveis, contribuindo para uma gestão mais eficiente e profissional da PS Sport’s.

## Como instalar o projeto

1. É possível instalar por [arquivo .zip](https://github.com/cabarros3/ps-sports/archive/refs/heads/main.zip)
2. Ou, se tiver git instalado, utilize o seguinte comando no terminal:

```bash
git clone https://github.com/cabarros3/ps-sports.git
```

## Como inicializar o banco de dados (Docker)

1. É necessário ter Docker instalado em seu computador. Siga as instruções do site oficial: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
2. Depois de instalar teste se está instalado corretamento utilizando o terminal (Linux/MacOS) ou PowerShell:

```bash
docker --version
```

3. Abra o terminal no diretório do projeto (dentro da pasta api-alunos) e rode o seguinte comando:

```bash
docker compose up -d
```

4. Após isso o banco de dados estara rodando na porta 3306

5. (Opcional) Caso deseje parar o projeto, siga o comando abaixo da mesma forma no passo 3:

```bash
docker compose stop
```

6. (Opcional) Caso deseje remover o projeto, siga o comando abaixo da mesma forma no passo 3:

```bash
docker compose down --volumes --remove-orphans
```

## Como iniciar o projeto

1. Instale os pacotes node_modules usando o seguinte comando no terminal:

```bash
npm i
```

2. Rode o script index.ts para iniciar o projeto:

```bash
node src/index.ts
```

3. (Opcional) Caso deseje iniciar o servidor e observar atualizações no código

```bash
node --watch src/index.ts
```

## 📍 Guia de Endpoints da API

A API PS-Sports é estruturada de forma modular, onde cada recurso possui seu próprio conjunto de rotas. Abaixo estão os prefixos base para cada módulo:

### 📑 Documentação Interativa (Swagger)

A API utiliza Swagger UI para fornecer uma interface onde você pode testar todos os endpoints em tempo real.

URL da Documentação: http://localhost:3000/api-docs

### 🛣️ Tabela de Rotas

| Módulo                  | Prefixo Base   | Descrição                                   |
| ----------------------- | -------------- | ------------------------------------------- |
| Autenticação & Usuários | `/users`       | Cadastro, listagem e gestão de usuários     |
| Cargos (Roles)          | `/roles`       | Gestão de permissões e tipos de acesso      |
| Atletas (Players)       | `/players`     | Cadastro e gestão de alunos/jogadores       |
| Responsáveis            | `/guardians`   | Gestão de pais ou responsáveis (Tarefa #31) |
| Aulas & Turmas          | `/classes`     | Agendamento e gestão de turmas              |
| Treinadores             | `/trainers`    | Gestão do corpo técnico                     |
| Financeiro / Leads      | `/leads`       | Gestão de potenciais clientes e prospecção  |
| Presença                | `/attendances` | Controle de frequência nas aulas            |
| Localização             | `/addresses`   | Gestão de endereços e unidades              |
| Modalidades             | `/modalities`  | Tipos de esportes oferecidos                |
| Contatos                | `/phones`      | Gestão de números telefônicos do sistema    |

### 🛠️ Como as rotas são carregadas

O sistema utiliza um Router central (src/routes/index.ts) que agrupa todos os módulos. Isso permite que a manutenção seja feita de forma isolada em cada arquivo .routes.ts.

Exemplo de estrutura de uma rota:
Para acessar a listagem de usuários, a requisição completa seria: GET http://localhost:3000/users/ (assumindo que o servidor rode na porta 3000).

### 🔒 Segurança e Acesso

Muitas dessas rotas (especialmente users, roles e staff) exigem que o Token JWT seja enviado no cabeçalho da requisição para autorizar o acesso:

```http
Authorization: Bearer <seu_token_jwt_aqui>
```

## 👥 Autores

- [@Sansao77](https://github.com/Sansao77)
- [@cabarros3](https://github.com/cabarros3)
- [@JhuliaEduarda](https://github.com/JhuliaEduarda)
- [@alissonnnps](http://github.com/alissonnnps)
- [@LeandroSampaio001](https://github.com/LeandroSampaio001)
- [@Nilda-png](https://github.com/Nilda-png)
- [@tramos222](http://github.com/tramos222)
- [@EduardaAraggao](https://github.com/EduardaAraggao)
- [@denisestalm](https://github.com/denisestalm)

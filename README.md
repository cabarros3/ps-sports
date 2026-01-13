# ps-sports

## Descrição

Repositório do projeto integrador

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

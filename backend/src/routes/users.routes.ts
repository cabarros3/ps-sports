import express from "express";

const routerUsers = express.Router();

// falta chamar os controllers?

routerUsers.get("/", (req, res) => res.send("Listar usuários"));
routerUsers.get("/:id", (req, res) => res.send("Buscar usuário"));
routerUsers.post("/", (req, res) => res.send("Criar usuário"));
routerUsers.put("/:id", (req, res) => res.send("Atualizar usuário"));
routerUsers.delete("/:id", (req, res) => res.send("Deletar usuário"));

export default routerUsers;

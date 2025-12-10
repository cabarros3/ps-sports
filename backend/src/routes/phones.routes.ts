import express from "express";

const routerPhones = express.Router();

// falta chamar os controllers?

routerPhones.get("/", (req, res) => res.send("Listar telefones"));
routerPhones.get("/:id", (req, res) => res.send("Buscar telefone"));
routerPhones.post("/", (req, res) => res.send("Criar telefone"));
routerPhones.put("/:id", (req, res) => res.send("Atualizar telefone"));
routerPhones.delete("/:id", (req, res) => res.send("Deletar telefone"));

export default routerPhones;

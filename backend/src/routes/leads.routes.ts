import express from "express";

const routerLeads = express.Router();

// falta chamar os controllers?

routerLeads.get("/", (req, res) => res.send("Listar leads"));
routerLeads.get("/:id", (req, res) => res.send("Buscar lead"));
routerLeads.post("/", (req, res) => res.send("Criar lead"));
routerLeads.put("/:id", (req, res) => res.send("Atualizar lead"));
routerLeads.delete("/:id", (req, res) => res.send("Deletar lead"));

export default routerLeads;

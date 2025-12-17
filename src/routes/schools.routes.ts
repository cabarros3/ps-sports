import express from "express";

const routerSchools = express.Router();

// falta chamar os controllers?

routerSchools.get("/", (req, res) => res.send("Listar escolas"));
routerSchools.get("/:id", (req, res) => res.send("Buscar escola"));
routerSchools.post("/", (req, res) => res.send("Criar escola"));
routerSchools.put("/:id", (req, res) => res.send("Atualizar escola"));
routerSchools.delete("/:id", (req, res) => res.send("Deletar escola"));

export default routerSchools;

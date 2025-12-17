import express from "express";

const routerStaff = express.Router();

// falta chamar os controllers?

routerStaff.get("/", (req, res) => res.send("Listar staff"));
routerStaff.get("/:id", (req, res) => res.send("Buscar staff"));
routerStaff.post("/", (req, res) => res.send("Criar staff"));
routerStaff.put("/:id", (req, res) => res.send("Atualizar staff"));
routerStaff.delete("/:id", (req, res) => res.send("Deletar staff"));

export default routerStaff;

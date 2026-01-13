import express from "express";

const routerTrainers = express.Router();

// falta chamar os controllers?

routerTrainers.get("/", (req, res) => res.send("Listar treinadores"));
routerTrainers.get("/:id", (req, res) => res.send("Buscar treinador"));
routerTrainers.post("/", (req, res) => res.send("Criar treinador"));
routerTrainers.put("/:id", (req, res) => res.send("Atualizar treinador"));
routerTrainers.delete("/:id", (req, res) => res.send("Deletar treinador"));

export default routerTrainers;

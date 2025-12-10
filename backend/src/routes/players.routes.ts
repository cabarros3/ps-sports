import express from "express";

const routerPlayers = express.Router();

// falta chamar os controllers?

routerPlayers.get("/", (req, res) => res.send("Listar jogadores"));
routerPlayers.get("/:id", (req, res) => res.send("Buscar jogador"));
routerPlayers.post("/", (req, res) => res.send("Criar jogador"));
routerPlayers.put("/:id", (req, res) => res.send("Atualizar jogador"));
routerPlayers.delete("/:id", (req, res) => res.send("Deletar jogador"));

export default routerPlayers;

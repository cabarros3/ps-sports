const express = require("express");
const router = express.Router();

// falta chamar os controllers?

router.get("/", (req, res) => res.send("Listar jogadores"));
router.get("/:id", (req, res) => res.send("Buscar jogador"));
router.post("/", (req, res) => res.send("Criar jogador"));
router.put("/:id", (req, res) => res.send("Atualizar jogador"));
router.delete("/:id", (req, res) => res.send("Deletar jogador"));

module.exports = router;

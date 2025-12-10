const express = require("express");
const router = express.Router();

// falta chamar os controllers?


router.get("/", (req, res) => res.send("Listar usuários"));
router.get("/:id", (req, res) => res.send("Buscar usuário"));
router.post("/", (req, res) => res.send("Criar usuário"));
router.put("/:id", (req, res) => res.send("Atualizar usuário"));
router.delete("/:id", (req, res) => res.send("Deletar usuário"));

module.exports = router;

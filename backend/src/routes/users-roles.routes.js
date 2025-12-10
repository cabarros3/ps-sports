const express = require("express");
const router = express.Router();

// falta chamar os controllers?

router.get("/", (req, res) => res.send("Listar vínculos usuário/role"));
router.post("/", (req, res) => res.send("Adicionar role ao usuário"));
router.delete("/", (req, res) => res.send("Remover role do usuário"));

module.exports = router;

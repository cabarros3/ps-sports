const express = require("express");
const router = express.Router();

// falta chamar os controllers?

router.get("/", (req, res) => res.send("Listar staff"));
router.get("/:id", (req, res) => res.send("Buscar staff"));
router.post("/", (req, res) => res.send("Criar staff"));
router.put("/:id", (req, res) => res.send("Atualizar staff"));
router.delete("/:id", (req, res) => res.send("Deletar staff"));

module.exports = router;

const express = require("express");
const router = express.Router();

// falta chamar os controllers?

router.get("/", (req, res) => res.send("Listar escolas"));
router.get("/:id", (req, res) => res.send("Buscar escola"));
router.post("/", (req, res) => res.send("Criar escola"));
router.put("/:id", (req, res) => res.send("Atualizar escola"));
router.delete("/:id", (req, res) => res.send("Deletar escola"));

module.exports = router;

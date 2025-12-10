const express = require("express");
const router = express.Router();

// falta chamar os controllers?

router.get("/", (req, res) => res.send("Listar telefones"));
router.get("/:id", (req, res) => res.send("Buscar telefone"));
router.post("/", (req, res) => res.send("Criar telefone"));
router.put("/:id", (req, res) => res.send("Atualizar telefone"));
router.delete("/:id", (req, res) => res.send("Deletar telefone"));

module.exports = router;

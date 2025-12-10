const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Listar categorias"));
router.get("/:id", (req, res) => res.send("Buscar categoria"));
router.post("/", (req, res) => res.send("Criar categoria"));
router.put("/:id", (req, res) => res.send("Atualizar categoria"));
router.delete("/:id", (req, res) => res.send("Deletar categoria"));

module.exports = router;

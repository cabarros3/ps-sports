const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Listar leads"));
router.get("/:id", (req, res) => res.send("Buscar lead"));
router.post("/", (req, res) => res.send("Criar lead"));
router.put("/:id", (req, res) => res.send("Atualizar lead"));
router.delete("/:id", (req, res) => res.send("Deletar lead"));

module.exports = router;

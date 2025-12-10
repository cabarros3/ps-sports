const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Listar treinadores"));
router.get("/:id", (req, res) => res.send("Buscar treinador"));
router.post("/", (req, res) => res.send("Criar treinador"));
router.put("/:id", (req, res) => res.send("Atualizar treinador"));
router.delete("/:id", (req, res) => res.send("Deletar treinador"));

module.exports = router;

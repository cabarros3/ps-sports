const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Listar roles"));
router.get("/:id", (req, res) => res.send("Buscar role"));
router.post("/", (req, res) => res.send("Criar role"));
router.put("/:id", (req, res) => res.send("Atualizar role"));
router.delete("/:id", (req, res) => res.send("Deletar role"));

module.exports = router;

import express from "express";

const routerCategories = express.Router();

// falta chamar os controllers?

routerCategories.get("/", (req, res) => res.send("Listar categorias"));
routerCategories.get("/:id", (req, res) => res.send("Buscar categoria"));
routerCategories.post("/", (req, res) => res.send("Criar categoria"));
routerCategories.put("/:id", (req, res) => res.send("Atualizar categoria"));
routerCategories.delete("/:id", (req, res) => res.send("Deletar categoria"));

export default routerCategories;

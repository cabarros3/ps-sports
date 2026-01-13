import express from "express";

const routerRoles = express.Router();

// falta chamar os controllers?

routerRoles.get("/", (req, res) => res.send("Listar roles"));
routerRoles.get("/:id", (req, res) => res.send("Buscar role"));
routerRoles.post("/", (req, res) => res.send("Criar role"));
routerRoles.put("/:id", (req, res) => res.send("Atualizar role"));
routerRoles.delete("/:id", (req, res) => res.send("Deletar role"));

export default routerRoles;

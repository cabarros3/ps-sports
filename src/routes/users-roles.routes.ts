import express from "express";
const routerUsersRoles = express.Router();

// falta chamar os controllers?

routerUsersRoles.get(
  "/",
  (req, res) => res.send("Listar vínculos usuário/role"),
);
routerUsersRoles.post("/", (req, res) => res.send("Adicionar role ao usuário"));
routerUsersRoles.delete("/", (req, res) => res.send("Remover role do usuário"));

export default routerUsersRoles;

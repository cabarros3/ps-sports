import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

// Rotas
import routesCategories from "./routes/categories.routes.ts";
import routesLeads from "./routes/leads.routes.ts";
import routesPhones from "./routes/phones.routes.ts";
import routesPlayers from "./routes/players.routes.ts";
import routesRoles from "./routes/roles.routes.ts";
import routesSchools from "./routes/schools.routes.ts";
import routesStaff from "./routes/staff.routes.ts";
import routesTrainers from "./routes/trainers.routes.ts";
import routesUsersRoles from "./routes/users-roles.routes.ts";
import routesUsers from "./routes/users.routes.ts";
import routesGuardians from "./routes/guardians.routes.ts"; // Adicionado para a tarefa #31

const router = Router();

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API PS-Sports",
      version: "1.0.0",
      description: "API para gerenciamento do sistema PS-Sports",
    },
  },
  apis: [
    "./src/routes/**/*.routes.ts",
    "./src/controllers/**/*.ts",
    "./src/models/**/*.ts",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Importar rotas
router.use("/users", routesUsers);
router.use("/users-roles", routesUsersRoles);
router.use("/trainers", routesTrainers);
router.use("/staff", routesStaff);
router.use("/schools", routesSchools);
router.use("/roles", routesRoles);
router.use("/players", routesPlayers);
router.use("/phones", routesPhones);
router.use("/leads", routesLeads);
router.use("/categories", routesCategories);
router.use("/guardians", routesGuardians); // Adicionado para a tarefa #31

// Rota de Documentação (Swagger UI)
router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customSiteTitle: "API Ps-Sports",
  }),
);

export default router;

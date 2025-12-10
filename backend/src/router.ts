import express from "express";

const app = express.Router();

// Importar rotas
app.use("/users", require("./routes/users.routes.ts"));
app.use("/phones", require("./routes/phones.routes.ts"));
app.use("/roles", require("./routes/roles.routes.ts"));
app.use("/users-roles", require("./routes/users-roles.routes.ts"));
app.use("/staff", require("./routes/staff.routes.ts"));
app.use("/trainers", require("./routes/trainers.routes.ts"));
app.use("/categories", require("./routes/categories.routes.ts"));
app.use("/schools", require("./routes/schools.routes.ts"));
app.use("/players", require("./routes/players.routes.ts"));
app.use("/leads", require("./routes/leads.routes.ts"));

export default app;

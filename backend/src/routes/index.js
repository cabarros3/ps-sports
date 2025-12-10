const express = require("express");
const app = express();

index.use(express.json());

// Importar rotas
app.use("/users", require("./routes/users.routes"));
app.use("/phones", require("./routes/phones.routes"));
app.use("/roles", require("./routes/roles.routes"));
app.use("/users-roles", require("./routes/users-roles.routes"));
app.use("/staff", require("./routes/staff.routes"));
app.use("/trainers", require("./routes/trainers.routes"));
app.use("/categories", require("./routes/categories.routes"));
app.use("/schools", require("./routes/schools.routes"));
app.use("/players", require("./routes/players.routes"));
app.use("/leads", require("./routes/leads.routes"));

module.exports = index;

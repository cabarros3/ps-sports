import express from "express";
import router from "./router.ts";
import { config } from "dotenv";
import { env } from "process";

config();

const server = express();
const PORTA = Number(env.SERVER_PORT) || 3000;

server.use(express.json());
server.use("/", router);

server.get("/", (_req, res) => {
  res.json(
    {
      message: "API PS-Sports com Express está funcionando!",
    },
  );
});

server.listen(PORTA, () => {
  console.log(`Servidor rodando em porta: http://localhost:${PORTA}`);
  console.log(
    `Documentação e UI interativo disponível em porta: http://localhost:${PORTA}/api-docs`,
  );
});

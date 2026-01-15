import { Router } from "express";
import ModalitiesControllers from "../controllers/ModalitiesController.ts";

const router = Router();

// Criar modalidade
router.post("/", ModalitiesControllers.criar);

// Listar modalidades
router.get("/", ModalitiesControllers.listar);

// Buscar por ID
router.get("/:id", ModalitiesControllers.buscarPorId);

// Atualizar
router.put("/:id", ModalitiesControllers.atualizar);

// Deletar
router.delete("/:id", ModalitiesControllers.deletar);

export default router;

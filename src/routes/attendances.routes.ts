import { Router } from "express";
import AttendancesControllers from "../controllers/AttendancesControllers.ts";

const router = Router();

// Criar attendance
router.post("/", AttendancesControllers.criar);

// Listar attendances
router.get("/", AttendancesControllers.listar);

// Buscar por ID
router.get("/:id", AttendancesControllers.buscarPorId);

// Atualizar
router.put("/:id", AttendancesControllers.atualizar);

// Deletar
router.delete("/:id", AttendancesControllers.deletar);

export default router;

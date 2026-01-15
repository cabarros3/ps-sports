import type { Request, Response } from "express";
import { Guardian } from "../models/Guardian.ts";

export class GuardianController {
  async create(req: Request, res: Response) {
    try {
      const guardian = await Guardian.create(req.body);
      return res.status(201).json(guardian);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const guardian = await Guardian.findByPk(req.params.id);
      return guardian
        ? res.json(guardian)
        : res.status(404).json({ error: "Não encontrado" });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new GuardianController();

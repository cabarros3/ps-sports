import type { Request, Response } from "express";
import { PlayersGuardians } from "../models/index.ts";

export const PlayersGuardiansController = {
  async listar(_req: Request, res: Response) {
    try {
      const vinculos = await PlayersGuardians.findAll();
      return res.json(vinculos);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async vincular(req: Request, res: Response) {
    try {
      const { player_id, guardian_id } = req.body;

      const exists = await PlayersGuardians.findOne({
        where: { player_id, guardian_id },
      });

      if (exists) {
        return res.status(400).json({ message: "Este vínculo já existe" });
      }

      const vinculo = await PlayersGuardians.create({
        player_id,
        guardian_id,
      });

      return res.status(201).json(vinculo);
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao criar vínculo",
        error: (error as Error).message,
      });
    }
  },

  async buscarPorPlayer(req: Request, res: Response) {
    try {
      const { player_id } = req.params;
      const vinculos = await PlayersGuardians.findAll({
        where: { player_id: Number(player_id) },
      });

      return res.json(vinculos);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async desvincular(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const vinculo = await PlayersGuardians.findByPk(id);

      if (!vinculo) {
        return res.status(404).json({ error: "Vínculo não encontrado" });
      }

      await vinculo.destroy();
      return res.json({ message: "Vínculo removido com sucesso" });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar vínculo",
        error: (error as Error).message,
      });
    }
  },
};

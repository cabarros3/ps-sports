import type { Request, Response } from "express";
import { Players } from "../models/index.ts";

export const PlayersController = {
  async listar(_req: Request, res: Response) {
    try {
      const players = await Players.findAll();

      return res.json(players);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const {
        weight,
        height,
        primary_position,
        second_position,
        dominant_foot,
        entry_date,
        sport_status,
        notes,
        user_id,
        school_id,
      } = req.body;

      const player = await Players.create({
        weight,
        height,
        primary_position,
        second_position,
        dominant_foot,
        entry_date,
        sport_status,
        notes,
        user_id,
        school_id,
      });

      const playerResponse = player.toJSON();
      return res.status(201).json(playerResponse);
    } catch (error) {
      // console.error("Erro ao criar usuário:", error);
      return res.status(400).json({
        message: "Erro ao criar o jogador",
        error: (error as Error).message,
      });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const player = await Players.findByPk(id);

      return res.json(player);
    } catch (error) {
      return res.status(500).json({
        message: "ID inválido ou erro no servidor",
        error: (error as Error).message,
      });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        weight,
        height,
        primary_position,
        second_position,
        dominant_foot,
        entry_date,
        sport_status,
        notes,
        user_id,
        school_id,
      } = req.body;

      const playerId = await Players.findByPk(id);

      if (!playerId) {
        return res
          .status(404)
          .json({ error: "Jogador não encontrado para atualização" });
      }

      await playerId.update({
        weight: weight || playerId.weight,
        height: height || playerId.height,
        primary_position: primary_position || playerId.primary_position,
        second_position: second_position || playerId.second_position,
        dominant_foot: dominant_foot || playerId.dominant_foot,
        entry_date: entry_date || playerId.entry_date,
        sport_status: sport_status || playerId.sport_status,
        notes: notes || playerId.notes,
        user_id: user_id || playerId.user_id,
        school_id: school_id || playerId.school_id,
      });

      return res.status(200).json({
        playerId,
        mensagem: "Jogador atualizado com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar o jogador",
        error: (error as Error).message,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const playerId = await Players.findByPk(id);

      if (!playerId) {
        return res.status(404).json({ error: "Jogador não encontrado" });
      }

      await playerId.destroy();
      return res.json({ mensagem: "Jogador removido com sucesso" });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar jogador",
        error: (error as Error).message,
      });
    }
  },
};

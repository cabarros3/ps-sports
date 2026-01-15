import type { Request, Response } from "express";
import { Trainers, Users } from "../models/index.ts";

export const TrainersController = {
  async criar(req: Request, res: Response) {
    try {
      const { license_level, specialty, user_id } = req.body;

      const trainer = await Trainers.create({
        license_level,
        specialty,
        user_id,
      });

      return res.status(201).json(trainer);
    } catch (error: any) {
      console.error("Erro ao criar treinador:", (error as Error).message);
      return res.status(400).json({
        message: "Não foi possível criar o treinador",
        error: (error as Error).message,
      });
    }
  },

  async listar(_req: Request, res: Response) {
    try {
      const trainers = await Trainers.findAll({
        attributes: ["license_level", "specialty"],
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["name", "email"],
          },
        ],
      });

      return res.json(trainers);
    } catch (error: any) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const trainerId = await Trainers.findByPk(id);

      if (!trainerId) {
        return res.status(404).json({ error: "Treinador não encontrado" });
      }

      return res.json(trainerId);
    } catch (error: any) {
      return res.status(500).json({
        message: "ID fornecido é inválido ou erro no servidor",
        error: (error as Error).message,
      });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { license_level, specialty } = req.body;
      const trainerId = await Trainers.findByPk(id);

      if (!trainerId) {
        return res
          .status(404)
          .json({ error: "Treinador não encontrado para atualização" });
      }

      await trainerId.update({
        license_level: license_level,
        specialty: specialty,
      });

      return res.status(200).json({
        trainerId,
        mensagem: "Lead atualizado com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao atualizar o treinador" });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const trainerId = await Trainers.findByPk(id);

      if (!trainerId) {
        return res.status(404).json({ error: "Lead não encontrado" });
      }

      await trainerId.destroy();

      return res.json({ mensagem: "Treinador removido com sucesso" });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao deletar o treinador",
        error: (error as Error).message,
      });
    }
  },
};

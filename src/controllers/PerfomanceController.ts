import type { Request, Response } from "express";
import { Performances } from "../models/Perfomance.ts";

export const PerformanceController = {
  async criar(req: Request, res: Response) {
    try {
      const {
        criteria,
        observation,
        level,
        trainer_id,
        academic_id,
      } = req.body;

      if (
        !criteria ||
        !observation ||
        !level ||
        !trainer_id ||
        !academic_id
      ) {
        return res.status(400).json({
          message: "Campos obrigatórios ausentes.",
        });
      }

      const performance = await Performances.create({
        criteria,
        observation,
        level,
        trainer_id,
        academic_id,
      });

      return res.status(201).json(performance);
    } catch (error) {
      console.error("Erro ao criar performance:", (error as Error).message);
      return res.status(400).json({
        message: "Não foi possível criar a performance",
        error: (error as Error).message,
      });
    }
  },

  async listar(_req: Request, res: Response) {
    try {
      const performances = await Performances.findAll();
      return res.json(performances);
    } catch (error) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const performance = await Performances.findByPk(id);

      if (!performance) {
        return res.status(404).json({
          error: "Performance não encontrada",
        });
      }

      return res.json(performance);
    } catch (error) {
      return res.status(500).json({
        message: "ID fornecido é inválido ou erro no servidor",
        error: (error as Error).message,
      });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        criteria,
        observation,
        level,
        trainer_id,
        academic_id,
      } = req.body;

      const performance = await Performances.findByPk(id);

      if (!performance) {
        return res.status(404).json({
          error: "Performance não encontrada para atualização",
        });
      }

      await performance.update({
        criteria: criteria ?? performance.criteria,
        observation: observation ?? performance.observation,
        level: level ?? performance.level,
        trainer_id: trainer_id ?? performance.trainer_id,
        academic_id: academic_id ?? performance.academic_id,
      });

      return res.status(200).json({
        performance,
        mensagem: "Performance atualizada com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar a performance",
        detalhes: (error as Error).message,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const performance = await Performances.findByPk(id);

      if (!performance) {
        return res.status(404).json({
          error: "Performance não encontrada",
        });
      }

      await performance.destroy();

      return res.json({
        mensagem: "Performance removida com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao deletar a performance",
        error: (error as Error).message,
      });
    }
  },
};

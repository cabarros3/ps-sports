import type { Request, Response } from "express";
import { Evaluations } from "../models/index.ts";

export const EvaluationsController = {
  async criar(req: Request, res: Response) {
    try {
      const { date, score, notes, trainer_id, academic_id } = req.body;

      const evaluation = await Evaluations.create({
        date,
        score,
        notes,
        trainer_id,
        academic_id,
      });

      return res.status(201).json(evaluation);
    } catch (error: unknown) {
      console.error("Erro ao criar avaliação:", (error as Error).message);
      return res.status(400).json({
        message: "Não foi possível criar a avaliação",
        error: (error as Error).message,
      });
    }
  },

  async listar(_req: Request, res: Response) {
    try {
      const evaluations = await Evaluations.findAll({
        attributes: ["date", "score", "notes", "trainer_id", "academic_id"],
      });

      return res.json(evaluations);
    } catch (error: unknown) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const evaluationId = await Evaluations.findByPk(id);

      if (!evaluationId) {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }

      return res.json(evaluationId);
    } catch (error: unknown) {
      return res.status(500).json({
        message: "ID fornecido é inválido ou erro no servidor",
        error: (error as Error).message,
      });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { date, score, notes, trainer_id, academic_id } = req.body;

      const evaluationId = await Evaluations.findByPk(id);

      if (!evaluationId) {
        return res
          .status(404)
          .json({ error: "Avaliação não encontrada para atualização" });
      }

      await evaluationId.update({
        date: date,
        score: score,
        notes: notes,
        trainer_id: trainer_id,
        academic_id: academic_id,
      });

      return res.status(200).json({
        evaluationId,
        mensagem: "Avaliação atualizada com sucesso",
      });
    } catch (error: unknown) {
      return res.status(500).json({
        message: "Erro ao atualizar a avaliação",
        error: (error as Error).message,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const evaluationId = await Evaluations.findByPk(id);

      if (!evaluationId) {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }

      await Evaluations.destroy();

      return res.json({ mensagem: "Avaliação removida com sucesso" });
    } catch (error: unknown) {
      return res.status(500).json({
        mensagem: "Erro ao deletar a avaliação",
        error: (error as Error).message,
      });
    }
  },
};

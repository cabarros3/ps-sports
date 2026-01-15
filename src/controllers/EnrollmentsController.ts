import type { Request, Response } from "express";
import { Enrollments } from "../models/Enrollments.ts";

export const EnrollmentsController = {
  async listar(_req: Request, res: Response) {
    try {
      const enrollments = await Enrollments.findAll({
        attributes: [
          "id",
          "entry_date",
          "status",
          "player_id",
          "class_id",
          "created_at",
          "updated_at",
        ],
      });
      return res.json(enrollments);
    } catch (error) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
    }
  },
  async criar(req: Request, res: Response) {
    try {
      const { player_id, class_id, status } = req.body;
      // Verificar se o player_id e class_id existem
      // Isso seria melhor com uma verificação real no banco
      if (!player_id || !class_id) {
        return res.status(400).json({
          message: "Os campos player_id e class_id são obrigatórios",
        });
      }
      const enrollment = await Enrollments.create({
        entry_date: new Date(),
        status: status || "Pendente",
        player_id,
        class_id,
      });
      return res.status(201).json(enrollment);
    } catch (error) {
      console.error("Erro ao criar matrícula:", (error as Error).message);
      return res.status(400).json({
        message: "Não foi possível criar a matrícula",
        error: (error as Error).message,
      });
    }
  },
  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const enrollment = await Enrollments.findByPk(id);
      if (!enrollment) {
        return res.status(404).json({ error: "Matrícula não encontrada" });
      }
      return res.json(enrollment);
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
      const { status } = req.body;
      const enrollment = await Enrollments.findByPk(id);
      if (!enrollment) {
        return res
          .status(404)
          .json({ error: "Matrícula não encontrada para atualização" });
      }
      await enrollment.update({
        status: status || enrollment.status,
      });
      return res.status(200).json({
        enrollment,
        mensagem: "Matrícula atualizada com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar a matrícula",
        message: (error as Error).message,
      });
    }
  },
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const enrollment = await Enrollments.findByPk(id);
      if (!enrollment) {
        return res.status(404).json({ error: "Matrícula não encontrada" });
      }
      await enrollment.destroy();
      return res.json({ mensagem: "Matrícula removida com sucesso" });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao deletar a matrícula",
        error: (error as Error).message,
      });
    }
  },
};

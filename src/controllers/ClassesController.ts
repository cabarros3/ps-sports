import type { Request, Response } from "express";
import { Classes } from "../models/index.ts";

export const ClassesController = {
  async listar(_req: Request, res: Response) {
    try {
      const classes = await Classes.findAll();

      return res.json(classes);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const {
        name,
        weekdays,
        schedule,
        status,
        modality_id,
        category_id,
        trainer_id,
      } = req.body;

      const classe = await Classes.create({
        name,
        weekdays,
        schedule,
        status,
        modality_id,
        category_id,
        trainer_id,
      });

      const playerResponse = classe.toJSON();
      return res.status(201).json(playerResponse);
    } catch (error) {
      // console.error("Erro ao criar usuário:", error);
      return res.status(400).json({
        message: "Erro ao criar a classe",
        error: (error as Error).message,
      });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const classe = await Classes.findByPk(id);

      return res.json(classe);
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
        name,
        weekdays,
        schedule,
        status,
        modality_id,
        category_id,
        trainer_id,
      } = req.body;

      const classId = await Classes.findByPk(id);

      if (!classId) {
        return res
          .status(404)
          .json({ error: "Classe não encontrado para atualização" });
      }

      await classId.update({
        name: name || classId.name,
        weekdays: weekdays || classId.weekdays,
        schedule: schedule || classId.schedule,
        status: status || classId.status,
        modality_id: modality_id || classId.modality_id,
        category_id: category_id || classId.category_id,
        trainer_id: trainer_id || classId.trainer_id,
      });

      return res.status(200).json({
        classId,
        mensagem: "Jogador atualizado com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar a classe",
        error: (error as Error).message,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const classId = await Classes.findByPk(id);

      if (!classId) {
        return res.status(404).json({ error: "Classe não encontrada" });
      }

      await classId.destroy();
      return res.json({ mensagem: "Classe removida com sucesso" });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar jogador",
        error: (error as Error).message,
      });
    }
  },
};

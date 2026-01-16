import type { Request, Response } from "express";
import { AcademicRecords } from "../models/index.ts";

export const AcademicRecordsController = {
  async criar(req: Request, res: Response) {
    try {
      const { year, semester, status, enrollment_id } = req.body;

      const academic_record = await AcademicRecords.create({
        year,
        semester,
        status,
        enrollment_id,
      });

      return res.status(201).json(academic_record);
    } catch (error: unknown) {
      console.error(
        "Erro ao criar o registro acadêmico:",
        (error as Error).message,
      );
      return res.status(400).json({
        message: "Não foi possível criar o registro acadêmico",
        error: (error as Error).message,
      });
    }
  },

  async listar(_req: Request, res: Response) {
    try {
      const academic_records = await AcademicRecords.findAll({
        attributes: ["id", "year", "semester", "status", "enrollement_id"],
      });

      return res.json(academic_records);
    } catch (error: unknown) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const academic_record_id = await AcademicRecords.findByPk(id);

      if (!academic_record_id) {
        return res
          .status(404)
          .json({ error: "Registro acadêmico não encontrado" });
      }

      return res.json(academic_record_id);
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
      const { year, semester, status, enrollment_id } = req.body;

      const academic_record = await AcademicRecords.findByPk(id);

      if (!academic_record) {
        return res.status(404).json({
          error: "Registro acadêmico não encontrado para atualização",
        });
      }

      await academic_record.update({
        year,
        semester,
        status,
        enrollment_id,
      });

      return res.status(200).json({
        academic_record,
        mensagem: "Registro acadêmico atualizado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao atualizar registro acadêmico:", error);

      return res.status(500).json({
        error: "Ocorreu um erro interno ao processar a atualização.",
        detalhes: error instanceof Error ? error.message : error,
      });
    }
  },
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const academic_record_id = await AcademicRecords.findByPk(id);

      if (!academic_record_id) {
        return res
          .status(404)
          .json({ error: "Registro acadêmico não encontrado" });
      }

      await academic_record_id.destroy();

      return res.json({ mensagem: "Registro acadêmico removido com sucesso" });
    } catch (error: unknown) {
      return res.status(500).json({
        mensagem: "Erro ao deletar o registro acadêmico",
        error: (error as Error).message,
      });
    }
  },
};

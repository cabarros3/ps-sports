import type { Request, Response } from "express";
import { Attendances } from "../models/Attendances.ts";

class attendancesControllers {
  // 🔹 Criar

  async criar(req: Request, res: Response) {
    try {
      const { class_date, status, enrollment_id } = req.body;

      const attendance = await Attendances.create({
        class_date,
        status,
        enrollment_id,
      });

      return res.status(201).json(attendance);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar presença",
        error,
      });
    }
  }

  //  Listar todas
  async listar(_req: Request, res: Response) {
    try {
      const attendances = await Attendances.findAll();
      return res.json(attendances);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar presenças",
        error,
      });
    }
  }

  // Buscar por ID
  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const attendance = await Attendances.findByPk(id);

      if (!attendance) {
        return res.status(404).json({
          message: "Presença não encontrada",
        });
      }

      return res.json(attendance);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar presença",
        error,
      });
    }
  }

  // Atualizar
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { class_date, status, enrollment_id } = req.body;

      const attendance = await Attendances.findByPk(id);

      if (!attendance) {
        return res.status(404).json({
          message: "Presença não encontrada",
        });
      }

      await attendance.update({
        class_date,
        status,
        enrollment_id,
      });

      return res.json(attendance);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar presença",
        error,
      });
    }
  }

  //  Deletar
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const attendance = await Attendances.findByPk(id);

      if (!attendance) {
        return res.status(404).json({
          message: "Presença não encontrada",
        });
      }

      await attendance.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar presença",
        error,
      });
    }
  }
}

export default new attendancesControllers();

import type { Request, Response } from "express";
import { Staffs } from "../models/index.ts";

export const StaffsController = {
  async criar(req: Request, res: Response) {
    try {
      const { hire_date, user_id } = req.body;

      const staffs = await Staffs.create({
        hire_date,
        user_id,
      });
      return res.status(201).json(staffs);
    } catch (error: unknown) {
      console.error("Erro ao criar o registro de funcionário", error);
      return res.status(400).json({
        message: "Não foi possível criar o registro",
        error: (error as Error).message,
      });
    }
  },

  async listar(_req: Request, res: Response) {
    try {
      const staffs = await Staffs.findAll({
        attributes: ["id", "hire_date", "user_id"],
      });
      return res.json(staffs);
    } catch (error: unknown) {
      return res
        .status(500)
        .json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const staffs = await Staffs.findByPk(id);

      if (!staffs) {
        return res
          .status(404)
          .json({ message: "Registro de funcionário não encontrado" });
      }

      return res.json(staffs);
    } catch (error: unknown) {
      return res
        .status(500)
        .json({
          message: "Erro no servidor ao buscar funcionário",
          error: (error as Error).message,
        });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { hire_date, user_id } = req.body;
      const staffs = await Staffs.findByPk(id);

      if (!staffs) {
        return res.status(404).json({
          error: "Registro não encontrado para atualização",
        });
      }

      await staffs.update({
        hire_date: hire_date ?? staffs.hire_date,
        user_id: user_id ?? staffs.user_id,
      });

      return res.status(200).json({
        staffs,
        mensagem: "Registro de staff atualizado com sucesso",
      });
    } catch (error: unknown) {
      return res.status(500).json({
        message: "Erro ao atualizar registro de funcionário",
        error: (error as Error).message,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const staffs = await Staffs.findByPk(id);

      if (!staffs) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }

      await staffs.destroy();
      return res.json({ mensagem: "Registro removido com sucesso" });
    } catch (error: unknown) {
      return res.status(500).json({
        message: "Erro ao deletar o registro",
        error: (error as Error).message,
      });
    }
  },
};

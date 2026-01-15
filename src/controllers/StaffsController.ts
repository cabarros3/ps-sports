import type { Request, Response } from "express";
import { Staffs } from "../models/index.ts";

export const StaffsController = {
  async criar(req: Request, res: Response) {
    try {
      const { hire_date, USR_ID } = req.body;

      const staffs = await Staffs.create({
        hire_date,
        USR_ID,
      });
      return res.status(201).json(staffs);
    } catch (error: any) {
      console.error("Erro ao criar o registro de funcionário", error);
      return res.status(400).json({
        message: "Não foi possível criar o registro",
        error: error.message,
      });
    }
  },

  async listar(req: Request, res: Response) {
    try {
      const staffs = await Staffs.findAll({
        attributes: ["id", "hire_date", "USR_ID"],
      });
      return res.json(staffs);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const staffs = await Staffs.findByPk(id);

      if (!staffs) {
        return res
          .status(404)
          .json({ error: "Registro de funcionário não encontrado" });
      }

      return res.json(staffs);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "Erro no servidor ao buscar funcionário" });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { hire_date, USR_ID } = req.body;
      const staffs = await Staffs.findByPk(id);

      if (!staffs) {
        return res.status(404).json({
          error: "Registro não encontrado para atualização",
        });
      }

      await staffs.update({
        hire_date: hire_date ?? staffs.hire_date,
        USR_ID: USR_ID ?? staffs.USR_ID,
      });

      return res.status(200).json({
        staffs,
        mensagem: "Registro de staff atualizado com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        error: "Erro ao atualizar resgistro de funcionário",
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
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao deletar o registro" });
    }
  },
};

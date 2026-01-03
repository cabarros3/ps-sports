import { Request, Response } from "express";
import { Leads } from "../models/Leads.ts";

export const LeadsController = {
  async criar(req: Request, res: Response) {
    try {
      const { LD_NAME, LDS_EMAIL, LDS_PHONE, LDS_SOURCE, LDS_STATUS } =
        req.body;

      const lead = await Leads.create({
        LD_NAME,
        LDS_EMAIL,
        LDS_PHONE,
        LDS_SOURCE,
        LDS_STATUS: LDS_STATUS || "Novo",
        LDS_ENTRY_DATE: new Date(),
        LDS_MAGIC_TOKEN: "", // verificar depois como fica
        LDS_MAGIC_EXPIRES_AT: new Date(),
      });

      return res.status(201).json(lead);
    } catch (error: any) {
      console.error("Erro ao criar lead:", error);
      return res.status(400).json({
        message: "Não foi possível criar o lead",
        error: error.message,
      });
    }
  },

  async listar(req: Request, res: Response) {
    try {
      const leads = await Leads.findAll({
        attributes: [
          "LD_NAME",
          "LDS_EMAIL",
          "LDS_PHONE",
          "LDS_SOURCE",
          "LDS_STATUS",
        ],
      });

      return res.json(leads);
    } catch (error: any) {
      console.error("ERRO NO BANCO:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const leadId = await Leads.findByPk(id);

      if (!leadId) {
        return res.status(404).json({ error: "Lead não encontrado" });
      }

      return res.json(leadId);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "ID fornecido é inválido ou erro no servidor" });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        LD_NAME,
        LDS_EMAIL,
        LDS_PHONE,
        LDS_SOURCE,
        LDS_STATUS,
        LDS_MAGIC_TOKEN,
        LDS_MAGIC_EXPIRES_AT,
      } = req.body;

      const leadId = await Leads.findByPk(id);

      if (!leadId) {
        return res
          .status(404)
          .json({ error: "Lead não encontrado para atualização" });
      }

      await leadId.update({
        LD_NAME: LD_NAME || leadId.LD_NAME,
        LDS_EMAIL: LDS_EMAIL || leadId.LDS_EMAIL,
        LDS_PHONE: LDS_PHONE || leadId.LDS_PHONE,
        LDS_SOURCE: LDS_SOURCE || leadId.LDS_SOURCE,
        LDS_STATUS: LDS_STATUS || leadId.LDS_STATUS,
        LDS_MAGIC_TOKEN: LDS_MAGIC_TOKEN || leadId.LDS_MAGIC_TOKEN,
        LDS_MAGIC_EXPIRES_AT:
          LDS_MAGIC_EXPIRES_AT || leadId.LDS_MAGIC_EXPIRES_AT,
      });

      return res.status(200).json({
        leadId,
        mensagem: "Lead atualizado com sucesso",
      });
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "O novo e-mail já está em uso por outro lead." });
      }
      return res.status(500).json({ error: "Erro ao atualizar o lead" });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const leadId = await Leads.findByPk(id);

      if (!leadId) {
        return res.status(404).json({ error: "Lead não encontrado" });
      }

      await leadId.destroy();

      return res.json({ mensagem: "Lead removido com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao deletar o lead" });
    }
  },
};

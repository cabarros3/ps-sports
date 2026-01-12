import type { Request, Response } from "express";
import { Leads } from "../models/index.ts";

export const LeadsController = {
  async criar(req: Request, res: Response) {
    try {
      const { name, email, phone, source, status } = req.body;

      const lead = await Leads.create({
        name,
        email,
        phone,
        source,
        status: status || "Novo",
        entry_date: new Date(),
        magic_token: "", // verificar depois como fica
        magic_expires_at: new Date(),
      });

      return res.status(201).json(lead);
    } catch (error) {
      console.error("Erro ao criar lead:", (error as Error).message);
      return res.status(400).json({
        message: "Não foi possível criar o lead",
        error: (error as Error).message,
      });
    }
  },

  async listar(_req: Request, res: Response) {
    try {
      const leads = await Leads.findAll({
        attributes: [
          "name",
          "email",
          "phone",
          "source",
          "status",
        ],
      });

      return res.json(leads);
    } catch (error) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
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
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "ID fornecido é inválido ou erro no servidor",
          error: (error as Error).message,
        });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        phone,
        source,
        status,
        magic_token,
        magic_expires_at,
      } = req.body;

      const leadId = await Leads.findByPk(id);

      if (!leadId) {
        return res
          .status(404)
          .json({ error: "Lead não encontrado para atualização" });
      }

      await leadId.update({
        name: name || leadId.name,
        email: email || leadId.email,
        phone: phone || leadId.phone,
        source: source || leadId.source,
        status: status || leadId.status,
        magic_token: magic_token || leadId.magic_token,
        magic_expires_at: magic_expires_at || leadId.magic_expires_at,
      });

      return res.status(200).json({
        leadId,
        mensagem: "Lead atualizado com sucesso",
      });
    } catch (error) {
      if ((error as Error).name === "SequelizeUniqueConstraintError") {
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
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao deletar o lead",
        error: (error as Error).message,
      });
    }
  },
};

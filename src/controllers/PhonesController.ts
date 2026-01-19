import type { Request, Response } from "express";
import { Phones } from "../models/index.ts";

export const PhonesController = {
  async criar(req: Request, res: Response) {
    try {
      const { number, user_id } = req.body;

      const phones = await Phones.create({
        number,
        user_id,
      });

      return res.status(201).json(phones);
    } catch (error: unknown) {
      console.error("Erro ao criar telefone: ", error);

      if ((error as Error).name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "Este número já está cadastrado." });
      }

      return res.status(400).json({
        message: "Não foi possível criar o telefone",
        error: (error as Error).message,
      });
    }
  },

  async listar(_req: Request, res: Response) {
    try {
      const phones = await Phones.findAll({
        attributes: [
          "id",
          "number",
          "user_id",
        ],
      });

      return res.json(phones);
    } catch (error: unknown) {
      console.error("ERRO NO BANCO: ", error);
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const phones = await Phones.findByPk(id);

      if (!phones) {
        return res.status(404).json({ error: "Telefone não encontrado" });
      }

      return res.json(phones);
    } catch (error: unknown) {
      return res
        .status(500)
        .json({
          message: "ID fornecido é inválido ou erro no servidor",
          error: error,
        });
    }
  },
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { number, user_id } = req.body;
      const phones = await Phones.findByPk(id);

      if (!phones) {
        return res
          .status(404)
          .json({ error: "Telefone não encontrado para atualização" });
      }

      await phones.update({
        number: number ?? phones.number,
        user_id: user_id ?? phones.user_id,
      });

      return res.status(200).json({
        phones,
        mensagem: "Telefone atualizado com sucesso",
      });
    } catch (error: unknown) {
      if ((error as Error).name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "Este número já está em uso" });
      }

      return res
        .status(500)
        .json({ error: "Erro ao atualizar o telefone" });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const phones = await Phones.findByPk(id);

      if (!phones) {
        return res
          .status(404)
          .json({ error: "Telefone não encontrado" });
      }

      await phones.destroy();
      return res.json({ mensagem: "Telefone removido com sucesso" });
    } catch (error: unknown) {
      return res
        .status(500)
        .json({
          message: "Erro ao deletar o sucesso",
          error: (error as Error).message,
        });
    }
  },
};

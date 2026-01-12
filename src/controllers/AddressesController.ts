import type { Request, Response } from "express";
import { Addresses } from "../models/index.ts";

export const AddressesController = {
  async criar(req: Request, res: Response) {
    try {
      const {
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipcode,
        user_id,
      } = req.body;

      const address = await Addresses.create({
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipcode,
        user_id,
      });

      return res.status(201).json(address);
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
      const adresses = await Addresses.findAll({
        attributes: [
          "street",
          "number",
          "complement",
          "neighborhood",
          "city",
          "state",
          "zipcode",
        ],
      });

      return res.json(adresses);
    } catch (error) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const addressId = await Addresses.findByPk(id);

      if (!addressId) {
        return res.status(404).json({ error: "Endereço não encontrado" });
      }

      return res.json(addressId);
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
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipcode,
        user_id,
      } = req.body;

      const addressId = await Addresses.findByPk(id);

      if (!addressId) {
        return res
          .status(404)
          .json({ error: "Endereço não encontrado para atualização" });
      }

      await addressId.update({
        street: street || addressId.street,
        number: number || addressId.number,
        complement: complement || addressId.complement,
        neighborhood: neighborhood || addressId.neighborhood,
        city: city || addressId.city,
        state: state || addressId.state,
        zipcode: zipcode || addressId.zipcode,
        user_id: user_id || addressId.user_id,
      });

      return res.status(200).json({
        addressId,
        mensagem: "Endereço atualizado com sucesso",
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
      const addressId = await Addresses.findByPk(id);

      if (!addressId) {
        return res.status(404).json({ error: "Endereço não encontrado" });
      }

      await addressId.destroy();

      return res.json({ mensagem: "Lead removido com sucesso" });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao deletar o lead",
        error: (error as Error).message,
      });
    }
  },
};

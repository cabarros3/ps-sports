import type { Request, Response } from "express";
import { Roles } from "../models/index.ts";

export const RolesController = {
  async listar(_req: Request, res: Response) {
    try {
      const roles = await Roles.findAll();
      return res.json(roles);
    } catch (error) {
      console.error("ERRO NO BANCO:", (error as Error).message);
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const roleExists = await Roles.findOne({ where: { name } });
      if (roleExists) {
        return res
          .status(400)
          .json({ message: "Já existe uma role com este nome" });
      }

      const role = await Roles.create({
        name,
        description,
      });

      return res.status(201).json(role);
    } catch (error) {
      console.error("Erro ao criar role:", (error as Error).message);
      return res.status(400).json({
        message: "Não foi possível criar a role",
        error: (error as Error).message,
      });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const role = await Roles.findByPk(id);

      if (!role) {
        return res.status(404).json({ error: "Role não encontrada" });
      }

      return res.json(role);
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
      const { name, description } = req.body;

      const role = await Roles.findByPk(id);
      if (!role) {
        return res
          .status(404)
          .json({ error: "Role não encontrada para atualização" });
      }

      if (name && name !== role.name) {
        const roleExists = await Roles.findOne({ where: { name } });
        if (roleExists) {
          return res
            .status(400)
            .json({ message: "Já existe outra role com este nome" });
        }
      }

      await role.update({
        name: name || role.name,
        description: description || role.description,
      });

      return res.status(200).json({
        role,
        mensagem: "Role atualizada com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar a role",
        message: (error as Error).message,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const role = await Roles.findByPk(id);

      if (!role) {
        return res.status(404).json({ error: "Role não encontrada" });
      }

      await role.destroy();
      return res.json({ mensagem: "Role removida com sucesso" });
    } catch (error) {
      if ((error as any).name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({
          mensagem:
            "Esta role está associada a usuários e não pode ser removida",
        });
      }
      return res.status(500).json({
        mensagem: "Erro ao deletar a role",
        error: (error as Error).message,
      });
    }
  },
};

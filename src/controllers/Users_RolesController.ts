import type { Request, Response } from "express";
import { UsersRoles } from "../models/index.ts";

export const UsersRolesController = {
  async listar(_req: Request, res: Response) {
    try {
      const mappings = await UsersRoles.findAll();
      return res.json(mappings);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const mapping = await UsersRoles.findByPk(id);

      if (!mapping) {
        return res.status(404).json({ error: "Vínculo não encontrado" });
      }

      return res.json(mapping);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const { user_id, role_id } = req.body;

      if (!user_id || !role_id) {
        return res.status(400).json({ error: "Campos 'user_id' e 'role_id' são obrigatórios" });
      }

      // Verifica se o usuário existe
      const user = await UsersRoles.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Evita duplicação do vínculo
      const existing = await UsersRoles.findOne({ where: { user_id, role_id } });
      if (existing) {
        return res.status(400).json({ error: "Vínculo já existe" });
      }

      const mapping = await UsersRoles.create({ user_id, role_id });
      return res.status(201).json(mapping);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const mapping = await UsersRoles.findByPk(id);

      if (!mapping) {
        return res.status(404).json({ error: "Vínculo não encontrado" });
      }

      await mapping.destroy();
      return res.json({ message: "Vínculo removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },
};

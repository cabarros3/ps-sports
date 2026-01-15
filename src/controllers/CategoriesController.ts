import { Request, Response } from "express";
import { Categories } from "../models/Categories.ts";

class CategoriesController {
  //  Criar categoria
  async criar(req: Request, res: Response) {
    try {
      const { name, min_age, max_age } = req.body;

      const category = await Categories.create({
        name,
        min_age,
        max_age,
      });

      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar categoria",
        error,
      });
    }
  }

  // Listar todas as categorias
  async listar(req: Request, res: Response) {
    try {
      const categories = await Categories.findAll();
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar categorias",
        error,
      });
    }
  }

  //  Buscar categoria por ID
  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await Categories.findByPk(id);

      if (!category) {
        return res.status(404).json({
          message: "Categoria não encontrada",
        });
      }

      return res.json(category);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar categoria",
        error,
      });
    }
  }

  //  Atualizar categoria
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, min_age, max_age } = req.body;

      const category = await Categories.findByPk(id);

      if (!category) {
        return res.status(404).json({
          message: "Categoria não encontrada",
        });
      }

      await category.update({
        name,
        min_age,
        max_age,
      });

      return res.json(category);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar categoria",
        error,
      });
    }
  }

  //  Deletar categoria
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await Categories.findByPk(id);

      if (!category) {
        return res.status(404).json({
          message: "Categoria não encontrada",
        });
      }

      await category.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar categoria",
        error,
      });
    }
  }
}

export default new CategoriesController()
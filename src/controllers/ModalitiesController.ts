
import { Request, Response } from "express";
import { Modalities } from "../models/Modalities.ts";

class modalitiesControllers {

  async criar(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const modality = await Modalities.create({ name });

      return res.status(201).json(modality);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar a Modalidade",
        error,
      });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const modalities = await Modalities.findAll();
      return res.json(modalities);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar Modalidades",
        error,
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const modality = await Modalities.findByPk(id);

      if (!modality) {
        return res.status(404).json({
          message: "Modalidade não encontrada",
        });
      }

      return res.json(modality);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar Modalidade",
        error,
      });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const modality = await Modalities.findByPk(id);

      if (!modality) {
        return res.status(404).json({
          message: "Modalidade não encontrada",
        });
      }

      await modality.update({ name });

      return res.json(modality);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar a modalidade",
        error,
      });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const modality = await Modalities.findByPk(id);

      if (!modality) {
        return res.status(404).json({
          message: "Modalidade não encontrada",
        });
      }

      await modality.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar Modalidade",
        error,
      });
    }
  }
}

export default new modalitiesControllers();
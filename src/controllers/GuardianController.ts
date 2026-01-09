import { Request, Response } from 'express';
import { Guardian } from '../models/Guardian';

export class GuardianController {
  async create(req: Request, res: Response) {
    try {
      const guardian = await Guardian.create(req.body);
      return res.status(201).json(guardian);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const guardian = await Guardian.findByPk(req.params.id);
      return guardian ? res.json(guardian) : res.status(404).json({ error: 'Não encontrado' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new GuardianController();
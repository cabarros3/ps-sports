import { Request, Response } from "express";
import { Schools } from "../models/index.ts";

export const SchoolsController = {
    async criar(req: Request, res: Response) {
        try {
            const { name, address, phone } = req.body;

            const schools = await Schools.create({
                name,
                address,
                phone,
            });

            return res.status(201).json(schools);
        } catch (error: any) {
            console.error("Erro ao criar escola: ", error);
            
            return res.status(400).json({
                message: "Não foi possível criar a escola", 
                error: error.message,
            });
        }
    },

    async listar(req: Request, res: Response) {
        try {
            const schools = await Schools.findAll({
                attributes: ["id", "name", "address", "phone"],
            });

            return res.json(schools);
        } catch (error: any) {
            console.error("Erro ao listar escolas: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async buscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const schools = await Schools.findByPk(id);

            if (!schools) {
                return res.status(404).json({ error: "Escola não encontrada" });
            }

            return res.json(schools);
        } catch (error: any) {
            return res
                .status(500)
                .json({ error: "ID fornecido é inválido ou erro no servidor" });
        }
    },

    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, address, phone } = req.body;
            const schools = await Schools.findByPk(id);

            if (!schools) {
                return res
                .status(404)
                .json({ error: "Escola não encontrada para atualização" });
            }

            await schools.update({
                name: name ?? schools.name,
                address: address ?? schools.address,
                phone: phone ?? schools.phone,
            });

            return res.status(200).json({
                schools,
                mensagem: "Escola atualizada com sucesso"
            });
        } catch (error: any) {
            return res
            .status(500)
            .json({ error: "Erro ao atualizar a escola" });
        }
    },

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const school = await Schools.findByPk(id);

            if (!school) {
                return res
                .status(404)
                .json({ error: "Escola não encontrada" });
            }

            await school.destroy();
            return res.json({ mensagem: "Escola removida com sucesso" });
        } catch (error: any) {
            return res
            .status(500)
            .json({ error: "Erro ao deletar a escola" });
        }
    },
};
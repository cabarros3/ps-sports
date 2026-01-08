import { Request, Response } from "express";
import { Phones } from "../models/Phones.ts";

export const PhonesController = {
    async criar(req: Request, res: Response) {
        try {
            const { number, USR_ID } = req.body;

            const phones = await Phones.create({
                number, 
                USR_ID,
            });

            return res.status(201).json(phones);
        } catch (error: any) {
            console.error("Erro ao criar telefone: ", error);
            
            if (error.name === "SequelizeUniqueConstraintError") {
                return res
                    .status(409)
                    .json({ error: "Este número já está cadastrado." });
            }

            return res.status(400).json({
                message: "Não foi possível criar o telefone", 
                error: error.message,
            });
        }
    },

    async listar(req: Request, res: Response) {
        try {
            const phones = await Phones.findAll({
                attributes: [ 
                    "id", 
                    "number", 
                    "USR_ID"
                ],
            });

            return res.json(phones);
        } catch (error: any) {
            console.error("ERRO NO BANCO: ", error);
            return res.status(500).json({ error: error.message });
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
        } catch (error: any) {
            return res
                .status(500)
                .json({ error: "ID fornecido é inválido ou erro no servidor" });
        }
    },
    async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { number, USR_ID} = req.body;
            const phones = await Phones.findByPk(id);

            if (!phones) {
                return res
                .status(404)
                .json({ error: "Telefone não encontrado para atualização" });
            }

            await phones.update({
                number: number ?? phones.number,
                USR_ID: USR_ID ?? phones.USR_ID,
            });

            return res.status(200).json({
                phones,
                mensagem: "Telefone atualizado com sucesso"
            });
        } catch (error: any) {
            if (error.name === "SequelizeUniqueConstraintError") {
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
        } catch (error: any) {
            return res
            .status(500)
            .json({ error: "Erro ao deletar o sucesso" });
        }
    },
};
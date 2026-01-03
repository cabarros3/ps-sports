import { Request, Response } from "express";
import { Users } from "../models/Users.ts";
import bcrypt from "bcrypt";

export const UsersController = {
  async criar(req: Request, res: Response) {
    try {
      const {
        USR_NAME,
        USR_BIRTH_DATE,
        USR_RG, // opcional
        USR_CPF,
        USR_EMAIL,
        USR_PASSWORD,
        USR_STATUS,
      } = req.body;

      // para verificar se o email já foi cadastrado
      const userExists = await Users.findOne({ where: { USR_EMAIL } });

      if (userExists) {
        return res.status(400).json({ message: "E-mail já cadastrado" });
      }

      // para criar a senha com hash
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(USR_PASSWORD, saltRounds);

      const user = await Users.create({
        USR_NAME,
        USR_BIRTH_DATE,
        USR_RG,
        USR_CPF,
        USR_EMAIL,
        USR_PASSWORD: hashedPassword,
        USR_STATUS: USR_STATUS || "Ativo",
      });

      // para remover a senha do response
      const userResponse = user.toJSON();
      delete userResponse.USR_PASSWORD;

      return res.status(201).json(userResponse);
    } catch (error: any) {
      // console.error("Erro ao criar usuário:", error);
      return res.status(400).json({
        message: "Erro ao criar usuário",
        error: error.message,
      });
    }
  },

  async listar(req: Request, res: Response) {
    try {
      const users = await Users.findAll({
        attributes: { exclude: ["USR_PASSWORD"] }, // para não listar a senha
      });

      return res.json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await Users.findByPk(id, {
        attributes: { exclude: ["USR_PASSWORD"] },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ error: "ID inválido ou erro no servidor" });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { USR_ID, USR_PASSWORD, USR_CPF, ...restanteDosDados } = req.body;

      const user = await Users.findByPk(id);
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });

      // MELHORIA: Criamos um objeto de dados para o update
      const dadosParaAtualizar: any = { ...restanteDosDados };

      if (USR_PASSWORD) {
        const saltRounds = 10;
        // Colocamos a senha dentro do objeto que será passado ao .update()
        dadosParaAtualizar.USR_PASSWORD = await bcrypt.hash(
          USR_PASSWORD,
          saltRounds
        );
      }

      await user.update(dadosParaAtualizar);

      const userAtualizado = user.toJSON();
      delete userAtualizado.USR_PASSWORD;

      return res
        .status(200)
        .json({
          message: "Usuário atualizado com sucesso",
          user: userAtualizado,
        });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "Erro interno ao atualizar usuário" });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = await Users.findByPk(id);

      if (!userId) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await userId.destroy();
      return res.json({ mensagem: "Usuário removido com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  },
};

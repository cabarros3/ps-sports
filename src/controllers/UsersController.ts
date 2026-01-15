import type { Request, Response } from "express";
import { Users } from "../models/index.ts";
//bcrypt - hashing

export const UsersController = {
  async listar(_req: Request, res: Response) {
    try {
      const users = await Users.findAll({
        attributes: { exclude: ["USR_PASSWORD"] }, // para não listar a senha
      });

      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const {
        name,
        birthDate,
        rg, // opcional
        cpf,
        email,
        password,
        status,
      } = req.body;

      // para verificar se o email já foi cadastrado
      const userExists = await Users.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ message: "E-mail já cadastrado" });
      }

      // para criar a senha com hash - melhorar mais tarde
      //const saltRounds = 10;
      const hashedPassword = password;

      const user = await Users.create({
        name,
        birth_date: birthDate,
        rg,
        cpf,
        email,
        password: hashedPassword,
        status: status || "Ativo",
      });

      // para remover a senha do response
      const userResponse = user.toJSON();
      delete userResponse.password;

      return res.status(201).json(userResponse);
    } catch (error) {
      // console.error("Erro ao criar usuário:", error);
      return res.status(400).json({
        message: "Erro ao criar usuário",
        error: (error as Error).message,
      });
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
    } catch (error) {
      return res.status(500).json({
        message: "ID inválido ou erro no servidor",
        error: (error as Error).message,
      });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { _password, _cpf, ...restanteDosDados } = req.body;

      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // MELHORIA: Criamos um objeto de dados para o update
      const dadosParaAtualizar = { ...restanteDosDados };

      /*if (password) {
        //const saltRounds = 10;
        // Colocamos a senha dentro do objeto que será passado ao .update()
        dadosParaAtualizar.USR_PASSWORD = await bcrypt.hash(
          password,
          saltRounds,
        )
      }*/

      await user.update(dadosParaAtualizar);

      const userAtualizado = user.toJSON();
      delete userAtualizado.password;

      return res
        .status(200)
        .json({
          message: "Usuário atualizado com sucesso",
          user: userAtualizado,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Erro interno ao atualizar usuário",
          error: (error as Error).message,
        });
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
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar usuário",
        error: (error as Error).message,
      });
    }
  },
};

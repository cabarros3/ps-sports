import type { Request, Response, NextFunction } from "express";
import { Users } from "../models/index.ts";
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Auth } from "../models/Auth.ts";

// --- SOLUÇÃO DEFINITIVA PARA O ERRO DE TIPAGEM ---
// Extraímos a chave e garantimos que ela é uma string.
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Em produção isso deve lançar um erro, em dev usamos um fallback
    return "chave_mestra_temporaria_para_desenvolvimento_123";
  }
  return secret;
};

const JWT_SECRET = getJwtSecret();
const JWT_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000;

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios" });
      }

      const user = await Users.findOne({
        where: { email },
        attributes: ["id", "name", "email", "password", "status"],
      });

      if (!user) {
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }

      if (user.status !== "Ativo") {
        return res
          .status(401)
          .json({ message: "Usuário inativo. Contate o administrador." });
      }

      //   const passwordIsValid = await bcrypt.compare(password, user.password);
      const passwordIsValid = await bcrypt.compare(password, user.password!);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }

      // Aqui o TS agora aceita 100% pois JWT_SECRET é explicitamente string
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      const refreshToken = randomUUID();
      const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN);

      await Auth.create({
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: expiresAt,
      });

      const userResponse = user.toJSON();
      delete (userResponse as any).password;

      return res.status(200).json({
        user: userResponse,
        token,
        refreshToken,
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (error) {
      console.error("Erro no login:", (error as Error).message);
      return res.status(500).json({
        message: "Erro interno no servidor",
        error: (error as Error).message,
      });
    }
  },

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token é obrigatório" });
      }

      const tokenRecord = await Auth.findOne({
        where: { refresh_token: refreshToken },
      });

      if (!tokenRecord) {
        return res.status(401).json({ message: "Refresh token inválido" });
      }

      if (new Date() > tokenRecord.expires_at) {
        await tokenRecord.destroy();
        return res.status(401).json({ message: "Refresh token expirado" });
      }

      const user = await Users.findByPk(tokenRecord.user_id, {
        attributes: ["id", "name", "email", "status"],
      });

      if (!user || user.status !== "Ativo") {
        if (tokenRecord) await tokenRecord.destroy();
        return res.status(401).json({ message: "Usuário inválido ou inativo" });
      }

      const newToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      const newRefreshToken = randomUUID();
      const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN);

      await tokenRecord.update({
        refresh_token: newRefreshToken,
        expires_at: expiresAt,
      });

      return res.status(200).json({
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (error) {
      console.error("Erro ao atualizar token:", (error as Error).message);
      return res.status(500).json({
        message: "Erro interno no servidor",
        error: (error as Error).message,
      });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token é obrigatório" });
      }

      const tokenRecord = await Auth.findOne({
        where: { refresh_token: refreshToken },
      });

      if (tokenRecord) {
        await tokenRecord.destroy();
      }

      return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error) {
      console.error("Erro no logout:", (error as Error).message);
      return res.status(500).json({
        message: "Erro interno no servidor",
        error: (error as Error).message,
      });
    }
  },

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  },
};

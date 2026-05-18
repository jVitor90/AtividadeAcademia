import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Logger from '../config/logger';

export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    req.userId = decoded.id;
    return next();
  } catch (error) {
    Logger.error(`Token de autenticação inválido: ${error}`);
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};
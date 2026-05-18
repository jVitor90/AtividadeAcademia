import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
import Logger from '../config/logger';

// Função que recebe um schema do Zod e retorna um middleware
export const validate = (schema: ZodTypeAny) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });

            return next();
        } catch (error: any) {
            Logger.warn('Tentativa de envio de dados invalidos barrada pelo zod.');
            // o Zod devolve um array de erros detalhado, vamos enviar isso para o cliente
            return res.status(400).json({
                error: 'Dados de entrada invalidos.',
                details: error.errors
            });
        }
    };
import { z } from 'zod';

export const createPlanoSchema = z.object({
  body: z.object({
    nome: z.string().min(3, 'O campo "nome" deve ter pelo menos 3 caracteres'),
    descricao: z.string().optional(),
    preco: z.number().positive('O preço deve ser maior que zero'),
    duracao: z.number().int().positive('A duração deve ser maior que zero'),
  }),
});

export const updatePlanoSchema = z.object({
  body: z.object({
    nome: z.string().min(3).optional(),
    descricao: z.string().optional(),
    preco: z.number().positive().optional(),
    duracao: z.number().int().positive().optional(),
    ativo: z.boolean().optional(),
  }),
});
import { z } from 'zod';

export const createAlunoSchema = z.object({
  body: z.object({
    nome: z.string().min(3, 'O campo "nome" deve ter pelo menos 3 caracteres'),
    email: z.string().email('O campo "email" deve ser um e-mail válido'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    telefone: z.string().optional(),
    planoId: z.number(),
  }),
});

export const updateAlunoSchema = z.object({
  body: z.object({
    nome: z.string().min(3).optional(),
    email: z.string().email().optional(),
    telefone: z.string().optional(),
    planoId: z.number().optional(),
    ativo: z.boolean().optional(),
  }),
});
import { z } from 'zod';

export const createFuncionarioSchema = z.object({
  body: z.object({
    nome: z.string().min(3, 'O campo "nome" deve ter pelo menos 3 caracteres'),
    email: z.string().email('O campo "email" deve ser um email válido'),
    telefone: z.string().optional(),
    cargo: z.string().min(2, 'O campo "cargo" deve ter pelo menos 2 caracteres'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  }),
});

export const updateFuncionarioSchema = z.object({
  body: z.object({
    nome: z.string().min(3).optional(),
    email: z.string().email().optional(),
    telefone: z.string().optional(),
    cargo: z.string().min(2).optional(),
    senha: z.string().min(6).optional(),
    ativo: z.boolean().optional(),
  }),
});
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

export const createFuncionario = async (nome: string, email: string, senha: string, telefone: string | undefined, cargo: string) => {
  const hashedSenha = await bcrypt.hash(senha, 10);
  const funcionario = await prisma.funcionario.create({
    data: { nome, email, senha: hashedSenha, telefone, cargo },
  });
  const { senha: _, ...funcionarioSemSenha } = funcionario;
  return funcionarioSemSenha;
};

export const getAllFuncionarios = async () => {
  return await prisma.funcionario.findMany({
    select: { id: true, nome: true, email: true, telefone: true, cargo: true, ativo: true },
  });
};

export const getFuncionarioById = async (id: number) => {
  const funcionario = await prisma.funcionario.findUnique({ where: { id } });
  if (!funcionario) return null;
  const { senha: _, ...funcionarioSemSenha } = funcionario;
  return funcionarioSemSenha;
};

export const updateFuncionario = async (id: number, data: { nome?: string; email?: string; telefone?: string; cargo?: string; ativo?: boolean }) => {
  const funcionario = await prisma.funcionario.update({ where: { id }, data });
  const { senha: _, ...funcionarioSemSenha } = funcionario;
  return funcionarioSemSenha;
};

export const deleteFuncionario = async (id: number) => {
  return await prisma.funcionario.delete({ where: { id } });
};
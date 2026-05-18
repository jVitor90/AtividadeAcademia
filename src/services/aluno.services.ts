import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

export const createAluno = async (nome: string, email: string, senha: string, telefone: string | undefined, planoId: number) => {
  const hashedSenha = await bcrypt.hash(senha, 10);
  const aluno = await prisma.aluno.create({
    data: { nome, email, senha: hashedSenha, telefone, planoId },
  });
  const { senha: _, ...alunoSemSenha } = aluno;
  return alunoSemSenha;
};

export const getAllAlunos = async () => {
  return await prisma.aluno.findMany({
    select: { id: true, nome: true, email: true, telefone: true, plano: true, ativo: true },
  });
};

export const getAlunoById = async (id: number) => {
  return await prisma.aluno.findUnique({
    where: { id },
    select: {                   
      id: true,
      nome: true,
      email: true,
      telefone: true,
      ativo: true,
      plano: true,             
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateAluno = async (id: number, data: { nome?: string; email?: string; telefone?: string; planoId?: number; ativo?: boolean }) => {
  return await prisma.aluno.update({ where: { id }, data });
};

export const deleteAluno = async (id: number) => {
  return await prisma.aluno.delete({ where: { id } });
};
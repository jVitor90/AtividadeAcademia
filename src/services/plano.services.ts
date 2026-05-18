import { prisma } from '../lib/prisma';

export const createPlano = async (nome: string, descricao: string | undefined, preco: number, duracao: number) => {
  return await prisma.plano.create({
    data: { nome, descricao, preco, duracao },
  });
};

export const getAllPlanos = async () => {
  return await prisma.plano.findMany();
};

export const getPlanoById = async (id: number) => {
  return await prisma.plano.findUnique({ where: { id } });
};

export const updatePlano = async (id: number, data: { nome?: string; descricao?: string; preco?: number; duracao?: number; ativo?: boolean }) => {
  return await prisma.plano.update({ where: { id }, data });
};

export const deletePlano = async (id: number) => {
  return await prisma.plano.delete({ where: { id } });
};
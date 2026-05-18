import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const login = async (email: string, senha: string) => {
  const funcionario = await prisma.funcionario.findUnique({ where: { email } });
  if (!funcionario) throw new Error('Funcionário não encontrado');

  const isSenhaValid = await bcrypt.compare(senha, funcionario.senha);
  if (!isSenhaValid) throw new Error('Senha incorreta');

  const token = jwt.sign(
    { id: funcionario.id, email: funcionario.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  const { senha: _, ...funcionarioSemSenha } = funcionario;
  return { funcionario: funcionarioSemSenha, token };
};
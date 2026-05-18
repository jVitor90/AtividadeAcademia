/*
  Warnings:

  - Added the required column `senha` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `funcionarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alunos" ADD COLUMN     "senha" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "senha" TEXT NOT NULL;

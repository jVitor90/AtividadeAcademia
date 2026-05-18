import { Request, Response } from 'express';
import * as alunoService from '../services/aluno.services';
import Logger from '../config/logger';

export const create = async (req: Request, res: Response) => {
    const { nome, email, senha, telefone, planoId } = req.body;

    try {
        const aluno = await alunoService.createAluno(nome, email, senha, telefone, planoId);
        Logger.info(`Aluno ${aluno.nome} criado com sucesso!`);
        res.status(201).json(aluno);
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'E-mail já cadastrado' });
            return;
        }
        Logger.error(`Erro ao criar aluno: ${error}`);
        res.status(500).json({ error: 'Erro ao criar aluno' });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const alunos = await alunoService.getAllAlunos();
        res.status(200).json(alunos);
    } catch (error) {
        Logger.error(`Erro ao listar alunos: ${error}`);
        res.status(500).json({ error: 'Erro ao listar alunos' });
    }
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const aluno = await alunoService.getAlunoById(Number(id));
        if (!aluno) {
            res.status(404).json({ error: 'Aluno não encontrado' });
            return;
        }
        res.status(200).json(aluno);
    } catch (error) {
        Logger.error(`Erro ao buscar aluno: ${error}`);
        res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const aluno = await alunoService.updateAluno(Number(id), data);
        res.status(200).json(aluno);
    } catch (error) {
        Logger.error(`Erro ao atualizar aluno: ${error}`);
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await alunoService.deleteAluno(Number(id));
        res.status(200).json({ message: 'Aluno removido com sucesso!' });
    } catch (error) {
        Logger.error(`Erro ao remover aluno: ${error}`);
        res.status(500).json({ error: 'Erro ao remover aluno' });
    }
};
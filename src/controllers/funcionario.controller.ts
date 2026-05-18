import { Request, Response } from 'express';
import * as funcionarioService from '../services/funcionario.services';
import Logger from '../config/logger';

export const create = async (req: Request, res: Response) => {
    const { nome, email, senha, telefone, cargo } = req.body;

    try {
        const funcionario = await funcionarioService.createFuncionario(nome, email, senha, telefone, cargo);
        Logger.info(`Funcionário ${funcionario.nome} criado com sucesso!`);
        res.status(201).json(funcionario);
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'E-mail já cadastrado' });
            return;
        }
        Logger.error(`Erro ao criar funcionário: ${error}`);
        res.status(500).json({ error: 'Erro ao criar funcionário' });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const funcionarios = await funcionarioService.getAllFuncionarios();
        res.status(200).json(funcionarios);
    } catch (error) {
        Logger.error(`Erro ao listar funcionários: ${error}`);
        res.status(500).json({ error: 'Erro ao listar funcionários' });
    }
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const funcionario = await funcionarioService.getFuncionarioById(Number(id));
        if (!funcionario) {
            res.status(404).json({ error: 'Funcionário não encontrado' });
            return;
        }
        res.status(200).json(funcionario);
    } catch (error) {
        Logger.error(`Erro ao buscar funcionário: ${error}`);
        res.status(500).json({ error: 'Erro ao buscar funcionário' });
    }
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const funcionario = await funcionarioService.updateFuncionario(Number(id), data);
        res.status(200).json(funcionario);
    } catch (error) {
        Logger.error(`Erro ao atualizar funcionário: ${error}`);
        res.status(500).json({ error: 'Erro ao atualizar funcionário' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await funcionarioService.deleteFuncionario(Number(id));
        res.status(200).json({ message: 'Funcionário removido com sucesso!' });
    } catch (error) {
        Logger.error(`Erro ao remover funcionário: ${error}`);
        res.status(500).json({ error: 'Erro ao remover funcionário' });
    }
};
import { Request, Response } from 'express';
import * as planoService from '../services/plano.services';
import Logger from '../config/logger';

export const create = async (req: Request, res: Response) => {
    const { nome, descricao, preco, duracao } = req.body;

    try {
        const plano = await planoService.createPlano(nome, descricao, preco, duracao);
        Logger.info(`Plano ${plano.nome} criado com sucesso!`);
        res.status(201).json(plano);
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Plano com esse nome já existe' });
            return;
        }
        Logger.error(`Erro ao criar plano: ${error}`);
        res.status(500).json({ error: 'Erro ao criar plano' });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const planos = await planoService.getAllPlanos();
        res.status(200).json(planos);
    } catch (error) {
        Logger.error(`Erro ao listar planos: ${error}`);
        res.status(500).json({ error: 'Erro ao listar planos' });
    }
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const plano = await planoService.getPlanoById(Number(id));
        if (!plano) {
            res.status(404).json({ error: 'Plano não encontrado' });
            return;
        }
        res.status(200).json(plano);
    } catch (error) {
        Logger.error(`Erro ao buscar plano: ${error}`);
        res.status(500).json({ error: 'Erro ao buscar plano' });
    }
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const plano = await planoService.updatePlano(Number(id), data);
        res.status(200).json(plano);
    } catch (error) {
        Logger.error(`Erro ao atualizar plano: ${error}`);
        res.status(500).json({ error: 'Erro ao atualizar plano' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await planoService.deletePlano(Number(id));
        res.status(200).json({ message: 'Plano removido com sucesso!' });
    } catch (error) {
        Logger.error(`Erro ao remover plano: ${error}`);
        res.status(500).json({ error: 'Erro ao remover plano' });
    }
};
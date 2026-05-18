import { Router } from 'express';
import alunoRoutes from './aluno.routes';
import funcionarioRoutes from './funcionario.routes';
import planoRoutes from './plano.routes';
import { login } from '../controllers/auth.controller';

const router = Router();

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API a correr perfeitamente.' });
});

router.post('/login', login);

router.use('/alunos', alunoRoutes);
router.use('/funcionarios', funcionarioRoutes);
router.use('/planos', planoRoutes);

export default router;
import { Router } from 'express';
import { create, list, getById, update, remove } from '../controllers/funcionario.controller';
import { validate } from '../middlewares/validate.middleware';
import { createFuncionarioSchema, updateFuncionarioSchema } from '../schemas/funcionario.schemas';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', validate(createFuncionarioSchema), create);
router.get('/', authenticate, list);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(updateFuncionarioSchema), update);
router.delete('/:id', authenticate, remove);

export default router;
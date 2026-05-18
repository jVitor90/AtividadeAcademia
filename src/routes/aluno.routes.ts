import { Router } from 'express';
import { create, list, getById, update, remove } from '../controllers/aluno.controller';
import { validate } from '../middlewares/validate.middleware';
import { createAlunoSchema, updateAlunoSchema } from '../schemas/aluno.schemas';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, validate(createAlunoSchema), create);
router.get('/', authenticate, list);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(updateAlunoSchema), update);
router.delete('/:id', authenticate, remove);

export default router;
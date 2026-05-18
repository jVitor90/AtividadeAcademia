import { Router } from 'express';
import { create, list, getById, update, remove } from '../controllers/plano.controller';
import { validate } from '../middlewares/validate.middleware';
import { createPlanoSchema, updatePlanoSchema } from '../schemas/plano.schemas';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, validate(createPlanoSchema), create);
router.get('/', authenticate, list);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, validate(updatePlanoSchema), update);
router.delete('/:id', authenticate, remove);

export default router;
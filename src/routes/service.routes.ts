import { Router } from 'express';
import { createService, getServiceById } from '../controllers/service.controller';
import { createServiceRules, getServiceRules } from '../validators/service.validator';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/', createServiceRules, validate, createService);
router.get('/:id', getServiceRules, validate, getServiceById);

export default router;
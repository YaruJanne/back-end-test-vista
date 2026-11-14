import { Router } from 'express';
import { createCompany, getCompanies } from '../controllers/company.controller';
import { createCompanyRules } from '../validators/company.validator';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', getCompanies);
router.post('/', createCompanyRules, validate, createCompany);
//               ↑ rules           ↑ check     ↑ only runs if valid

export default router;
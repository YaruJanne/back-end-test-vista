import { body } from 'express-validator';

export const createCompanyRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ max: 191 }).withMessage('Company name must be at most 191 characters'),
  body('registrationNumber')
    .trim()
    .notEmpty().withMessage('Registration number is required')
    .isLength({ max: 191 }).withMessage('Registration number must be at most 191 characters'),
];
import { body, param } from 'express-validator';

export const createServiceRules = [
  body('companyId')
    .notEmpty().withMessage('Company ID is required').bail()
    .isInt({ min: 1 }).withMessage('Company ID must be a positive integer')
    .toInt(),
  body('name')
    .trim()
    .notEmpty().withMessage('Service name is required')
    .isLength({ max: 191 }).withMessage('Service name must be at most 191 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('price')
    .notEmpty().withMessage('Price is required').bail()
    .isFloat({ min: 0, max: 99999999.99 }).withMessage('Price must be a number between 0 and 99,999,999.99')
    .toFloat(),
];

export const getServiceRules = [
  param('id')
    .isInt({ min: 1 }).withMessage('Service ID must be a positive integer'),
];
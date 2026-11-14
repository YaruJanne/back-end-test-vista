import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ErrorResponseDto } from '../types/dto';

export function validate(req: Request, res: Response<ErrorResponseDto>, next: NextFunction): void {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({
      message: 'Validation failed',
      errors: result.array().map((e) => ({
        field: e.type === 'field' ? e.path : e.type,
        message: String(e.msg),
      })),
    });
    return;
  }

  next();
}
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ErrorResponseDto } from '../types/dto';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ErrorResponseDto>,
  _next: NextFunction, // must have 4 params so Express treats this as an error handler
): void {
  // Known database errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({ message: 'A record with this value already exists' });
      return;
    }
    if (err.code === 'P2003') {
      res.status(400).json({ message: 'Related record does not exist' });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Record not found' });
      return;
    }
  }

  // Broken JSON in the request body
  if (typeof err === 'object' && err !== null && 'type' in err && err.type === 'entity.parse.failed') {
    res.status(400).json({ message: 'Invalid JSON body' });
    return;
  }

  // Anything else is unexpected, so log it and hide the details from the client
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
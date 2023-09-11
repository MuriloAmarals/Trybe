import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErroTypes } from '../error/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  const messageErrorType = err.message as keyof typeof ErroTypes;
  const mappedError = errorCatalog[messageErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
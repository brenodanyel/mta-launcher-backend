import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
  ) {
    super(message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(409, message);
  }
}

export class InvalidTokenError extends HttpError {
  constructor(message: string) {
    super(498, message);
  }
}

export class InvalidRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export const HandleError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({ errors: error.issues });
    return;
  }

  console.error(error);

  res.status(500).json({ error: 'Internal Server Error' });
};

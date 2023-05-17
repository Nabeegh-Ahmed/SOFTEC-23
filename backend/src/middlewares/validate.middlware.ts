import { NextFunction, Request } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { IAppResponse } from '../types';

export const validate = (schema: AnyZodObject) => (req: Request, res: IAppResponse, next: NextFunction) => {
  try {
    const s = schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });
    console.log(s)

    return next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: 'fail',
        error: err.errors,
      });
    }

    next(err);
  }
};

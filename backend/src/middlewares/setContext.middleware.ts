import { NextFunction, Request } from 'express';
import { IAppResponse } from '../types';

export const SetContext = (req: Request, res: IAppResponse, next: NextFunction) => {
    res.locals.store = {};
    return next();
};

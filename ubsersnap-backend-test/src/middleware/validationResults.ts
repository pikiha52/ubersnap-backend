import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import { response } from '../helpers/response';

const validationResults = (req: Request, res: Response, next: NextFunction): Response<any> | void => {
    const errors: Result<ValidationError> = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors: { [x: string]: any }[] = [];
    errors.array().map(err => extractedErrors.push({ [err.param === undefined ? 'message' : err.param]: err.msg }));
    return response(res, 400, '400', null, extractedErrors);
};

export {
    validationResults
};

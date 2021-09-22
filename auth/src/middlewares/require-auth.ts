import { Request, Response, NextFunction} from 'express';
import { NotAuthirizedError } from '../errors/not-authorized-error';

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.currentUser){
        return new NotAuthirizedError();
    }

    next();
}
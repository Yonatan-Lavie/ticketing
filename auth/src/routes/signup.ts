import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '@ly-common-lib/common'
import { User } from '../models/user';
import { BadRequestError } from '@ly-common-lib/common'


const router = express.Router()

router.post('/api/users/signup', [
    body('firstName').not().isEmpty(),
    body('lastName').not().isEmpty(),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min:4, max:20 })
        .withMessage('Password must be between 4 and 20 characters'),

], 
validateRequest,
async (req: Request,res: Response) => {
    const { firstName, lastName, email, password  } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new BadRequestError('Email in use!!');
    }

    const user = User.build({ firstName, lastName, email, password });
    await user.save();

    // Generate JWT

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
        }, 
        process.env.JWT_KEY!
    );


    // Store it on session object
    req.session = {
        jwt: userJwt
    };


    res.status(201).send(user);
});

export { router as signupRouter };
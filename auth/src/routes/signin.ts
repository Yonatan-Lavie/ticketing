import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'

import { Password } from '../services/password'
import { User } from '../models/user';
import { validateRequest } from '@ly-common-lib/common'
import { BadRequestError } from '@ly-common-lib/common'

const router = express.Router()

router.post('/api/users/signin',
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], 
validateRequest,
async (req: Request,res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('Invalid credentials');
    }
    const passwordMatch = await Password.compre(existingUser.password, password);
    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
        }, 
        process.env.JWT_KEY!
    );


    // Store it on session object
    req.session = {
        jwt: userJwt
    };


    res.status(200).send(existingUser);

});

export { router as signinRouter };
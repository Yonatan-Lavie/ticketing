import express, { Request, Response, NextFunction } from 'express';
import { passport } from '../services/local-passport';
import jwt from 'jsonwebtoken'
import { BadRequestError, validateRequest } from '@ly-common-lib/common';
import { body } from 'express-validator';
import { LocalUser } from '../models/local-user.schema';



const router = express.Router()

router.post('/api/users/login/federated/local', 
 [
  body('email')
      .isEmail()
      .withMessage('Email must be valid'),
  body('password')
      .trim()
      .isLength({ min:4, max:20 })
      .withMessage('Password must be between 4 and 20 characters')
], 
validateRequest,
  passport.authenticate('local', { failureRedirect: '/auth/signin-oauth' }),
  async function(req: Request, res: Response) {

    const { id, email } = req.user as {id: string, email: string};

    // Generate JWT

    const userJwt = jwt.sign({
        id,
        email
        }, 
        process.env.JWT_KEY!
    );


    // Store it on session object
    req.session = {
        jwt: userJwt
    };


    res.redirect(`https://ticketing.dev`);
  });

export { router as localLoginRouter };
import express, { Request, Response, NextFunction } from 'express';
import { passport } from '../services/google-passport';
import jwt from 'jsonwebtoken'
import { BadRequestError } from '@ly-common-lib/common';
import { GoogleUser } from '../models/google-user.schema';


const router = express.Router()

// Define an API route to initiate the Google OAuth 2.0 flow
router.get(
  '/api/users/login/federated/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Define an API route to handle the Google OAuth 2.0 callback
router.get(
  '/api/users/login/federated/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Redirect the user to the client app with the JWT token in the URL hash
      // const user = req.user as any;
      // const user = 'req.user as any;'
      const user = req.user as { id: string, email: string, photo: string };
      console.log(user)
      // Generate JWT
      if(!user){
        throw new BadRequestError('Invalid credentials');
      }
      // console.log("GOOGLE auth call back:",user);

      const userJwt = jwt.sign({
          id: user.id,
          email: user.email,
          photo: user.photo
          }, 
          process.env.JWT_KEY!
      );
  
  
    // Store it on session object
    req.session = {
        jwt: userJwt
    };
    res.redirect(`https://ticketing.dev`);
  }
);

export { router as googleLoginRouter };
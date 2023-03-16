import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { LocalUser } from '../models/local-user.schema';
import { BadRequestError, DatabaseConnectionError} from '@ly-common-lib/common';
import { Password } from './password';

// Configure Passport with Local Strategy
passport.use(new LocalStrategy(
  async (email: string, password: string,  done: any) => {
    const existingUser = await LocalUser.findOne({email});
    if(!existingUser){
      const user = LocalUser.build({ email, password });
      await user.save();
    }
    const localUser = await LocalUser.findOne({email});
    if(!localUser){
      throw new BadRequestError('Internal Error: Cen\'t find user');
      
    }
    const passwordMatch = await Password.compre(localUser.password, password);
    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials');
    }
  
      const user = { id: localUser.id, email: localUser.email };
      done(null, user);
  }
));

// // Serialize and deserialize the user for sessions
// passport.serializeUser<any, any>((user, req, done) => done(null, user));
// passport.deserializeUser<any, any>((user, done) => done(null, user));

// Set up the Express app
// const passportInitialize = passport.initialize()
// const passportSession = passport.session()
// const expressUrlencoded = express.urlencoded({ extended: true })
// const expressJson = express.json()



export { passport }
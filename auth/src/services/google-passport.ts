import express, { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { GoogleUser } from '../models/google-user.schema';
import { BadRequestError } from '@ly-common-lib/common';

// Configure Passport with Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/api/users/login/federated/google/callback'
}, 
async (accessToken: string, refreshToken: string, profile: Profile, done: any) => {

        const existingUser = await GoogleUser.findOne({googleId:profile.id})

        if(!existingUser){
          const newGoogleUser =  GoogleUser.build({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails![0].value,
            verified: profile.emails![0].verified === 'false' ? false : true,
            firstName: profile.name?.givenName || 'undefined',
            lastName: profile.name?.familyName || 'undefined',
            photoURL: profile.photos![0].value 
          })
          await newGoogleUser.save()
        }

        const googleUser = await GoogleUser.findOne({googleId:profile.id})
        console.log('googleUser : ', googleUser)
       
        const userId = googleUser?.googleId;
        const email = googleUser?.email;
        const photo = googleUser?.photoURL;
  
        const user = { id: userId, email: email, photo: photo };
        done(null, user);
}));


// // Serialize and deserialize the user for sessions
// passport.serializeUser<any, any>((user, req, done) => done(null, user));
// passport.deserializeUser<any, any>((user, done) => done(null, user));

// Set up the Express app
// const passportInitialize = passport.initialize()
// const passportSession = passport.session()
// const expressUrlencoded = express.urlencoded({ extended: true })
// const expressJson = express.json()



export { passport }
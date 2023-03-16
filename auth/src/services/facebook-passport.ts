import {Router} from "express";
import passport from 'passport';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
import { FacebookUser } from "../models/facebook-user.schema";


// Configure Passport with Google Strategy

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  callbackURL: '/api/users/login/federated/facebook/callback',
}, 
async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => {
  const userId = profile.id;
  const displayName = profile.displayName;
  console.log('accessToken : ', accessToken);
  console.log('refreshToken : ', refreshToken);
  console.log('row_profile : ', profile);
  console.log('userId : ', userId);
  console.log('displayName : ', displayName);

  const existingUser = await FacebookUser.findOne({facebookId: profile.id})

  if(!existingUser){
    const newFacebookUser =  FacebookUser.build({
      facebookId: userId,
      displayName: displayName
    })
    await newFacebookUser.save()
  }

  const facebookUser = await FacebookUser.findOne({facebookId:userId})
  console.log('FacebookUser : ', facebookUser)


  const user = { id: userId, email: "undefined", photo: "undefined" };
  done(null, user);
}))


export { passport }
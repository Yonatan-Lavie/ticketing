import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

export const genCookie = async () => {
    const id = genFakeId();
    const email = 'test@test.com';
    const password = 'password';
    
    const userJwt = jwt.sign({
        id,
        email
        }, 
        process.env.JWT_KEY!
    );
    const session = {
        jwt: userJwt
    };
    const base64Session = Buffer.from(JSON.stringify(session)).toString('base64');

    const cookie = "express:sess=" + base64Session;
    return cookie;
  };

  export const genFakeId = () => new mongoose.Types.ObjectId().toHexString();
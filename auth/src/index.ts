import mongoose from 'mongoose';
import { app } from './app'

const start = async () => {
    console.log('starting server..');
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }
    else {
        console.log("Got JWT_KEY: ",process.env.JWT_KEY)
    }
    if(!process.env.GOOGLE_CLIENT_ID){
        throw new Error('GOOGLE_CLIENT_ID must be defined');
    }
    else {
        console.log("Got GOOGLE_CLIENT_ID: ",process.env.GOOGLE_CLIENT_ID)
    }
    if(!process.env.GOOGLE_CLIENT_SECRET){
        throw new Error('GOOGLE_CLIENT_SECRET must be defined');
    }
    else {
        console.log("Got GOOGLE_CLIENT_SECRET: ",process.env.GOOGLE_CLIENT_SECRET)
    }
    if(!process.env.FACEBOOK_CLIENT_ID){
        throw new Error('FACEBOOK_CLIENT_ID must be defined');
    }
    else {
        console.log("Got FACEBOOK_CLIENT_ID: ",process.env.FACEBOOK_CLIENT_ID)
    }
    if(!process.env.FACEBOOK_CLIENT_SECRET){
        throw new Error('FACEBOOK_CLIENT_SECRET must be defined');
    }
    else {
        console.log("Got FACEBOOK_CLIENT_SECRET: ",process.env.FACEBOOK_CLIENT_SECRET)
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }
    else {
        console.log("Got MONGO_URI: ",process.env.MONGO_URI)
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, ()=>{
        console.log('Listening on port 3000!');
    })
    
}

start();

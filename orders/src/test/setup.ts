import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { app } from '../app';

declare global {
    var signin: () => string[];
}


let mongo: any

jest.mock('../nats-wrapper');

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();
    
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    const id = new mongoose.Types.ObjectId().toHexString();
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

    const sessionJSON = JSON.stringify(session)

    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
}

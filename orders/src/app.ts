import express from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { newOrderRouter } from './routes/new'
import { shwoOrderRouter } from './routes/show'
import { indexOrderRouter } from './routes/index'
import { deleteOrderRouter } from './routes/delete'

import {currentUser} from '@ly-common-lib/common'
import { errorHandler } from '@ly-common-lib/common'
import { NotFoundError } from '@ly-common-lib/common'

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== 'test',
    })
  );

app.use(currentUser);

app.use(newOrderRouter);
app.use(indexOrderRouter);
app.use(shwoOrderRouter);
app.use(deleteOrderRouter);

app.get('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);


export { app };
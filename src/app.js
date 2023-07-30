import express from 'express';
import { usersRouter } from './routers/user.router.js';
import { transferRouter } from './routers/transfer.router.js';
import { pathNotFound } from './middlewares/path.not.found.middleware.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

export const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transferRouter);

app.all('*', pathNotFound);

app.use(globalErrorHandler);

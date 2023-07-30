import express from 'express';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import { transferController } from '../controllers/transfer.controller.js';

export const transferRouter = express.Router();

transferRouter
    .route('/')
    .post(
        validateMiddleware.transferValidator,
        transferController.create
    );

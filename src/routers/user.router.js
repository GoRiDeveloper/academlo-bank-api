import express from 'express';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import { userController } from '../controllers/user.controller.js';

export const usersRouter = express.Router();

usersRouter
    .route('/signup')
    .post(
        validateMiddleware.createUserValidator,
        userController.create
    );

usersRouter
    .route('/login')
    .post(validateMiddleware.loginValidator, userController.findOne);

usersRouter
    .route('/:id/history')
    .get(
        validateMiddleware.idParamValidator,
        validateMiddleware.validUser,
        userController.findAll
    );

import { param, body, validationResult } from 'express-validator';
import { User } from '../models/User.model.js';
import { Transfer } from '../models/Transfer.model.js';
import { catchAsync } from '../utils/catch.async.js';
import { userService } from '../service/user.service.js';

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        });
    }
    next();
};

const validateUser = ({ body }, res, next) => {
    for (const key in body) {
        const model = { ...User.getAttributes() };

        delete model.id;
        delete model.status;

        const modelUpdate = Object.keys(model);

        if (!modelUpdate.includes(key)) delete body[key];
    }
    next();
};

const validateTransfer = ({ body }, res, next) => {
    for (const key in body) {
        const model = { ...Transfer.getAttributes() };

        delete model.id;
        delete model.senderUserId;

        const modelKeys = Object.keys(model);
        const modelUpdate = [
            'accountNumber',
            'receiverAccountNumber',
            ...modelKeys,
        ];

        if (!modelUpdate.includes(key)) delete body[key];
    }

    next();
};

export const validateMiddleware = Object.freeze({
    idParamValidator: [
        param('id')
            .notEmpty()
            .withMessage('El ID Es Requerido.')
            .toInt()
            .trim(),
        validateFields,
    ],
    createUserValidator: [
        body('name')
            .notEmpty()
            .withMessage('El Nombre Es Requerido.')
            .isString()
            .withMessage('El Nombre Debe Ser Solo Texto.')
            .trim()
            .toLowerCase(),
        body('password')
            .notEmpty()
            .withMessage('La Contraseña Es Requerida.')
            .isStrongPassword({
                minLength: 10,
                minNumbers: 1,
                minUppercase: 1,
                minSymbols: 1,
                minLowercase: 1,
            })
            .withMessage('La Contraseña Debe Ser Segura.')
            .trim(),
        validateFields,
        validateUser,
    ],
    loginValidator: [
        body('accountNumber')
            .notEmpty()
            .withMessage('El Número De Cuenta Es Requerido.')
            .isInt()
            .withMessage(
                'El Número De Cuenta Debe Ser Un Número Entero.'
            )
            .isLength({ min: 6, max: 6 })
            .withMessage('El Número De Cuenta Debe Ser De 6 Dígitos.')
            .trim(),
        body('password')
            .notEmpty()
            .withMessage('La Contraseña Es Requerida.')
            .trim(),
        validateFields,
        validateUser,
    ],
    transferValidator: [
        body('amount')
            .notEmpty()
            .withMessage('La Cantidad Es Requerida.')
            .toFloat()
            .isFloat({ min: 1 })
            .withMessage(
                'La Cantidad Debe Ser Un Número Mayor A Uno.'
            ),
        body('accountNumber')
            .notEmpty()
            .withMessage('El Número De Cuenta Es Requerido.')
            .isInt()
            .withMessage(
                'El Número De Cuenta Debe Ser Un Número Entero.'
            )
            .isLength({ min: 6, max: 6 })
            .withMessage(
                'El Número De Cuenta Debe Ser De 6 Dígitos.'
            ),
        body('receiverAccountNumber')
            .notEmpty()
            .withMessage(
                'El Número De Cuenta Del Destinatario Es Requerido.'
            )
            .isInt()
            .withMessage(
                'El Número De Cuenta Del Destinatario Debe Ser Un Número Entero.'
            )
            .isLength({ min: 6, max: 6 })
            .withMessage(
                'El Número De Cuenta Del Destinatario Debe Ser De 6 Dígitos.'
            ),
        validateFields,
        validateTransfer,
    ],
    validUser: catchAsync(async (req, res, next) => {
        if (!req.user) {
            const { id } = req.params;
            const user = await userService.getUser({ id }, true);

            req.user = user;
        }

        next();
    }),
});

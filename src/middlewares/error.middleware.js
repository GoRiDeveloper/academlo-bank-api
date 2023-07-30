import { config } from '../config/config.js';
import { errorController } from '../controllers/error.controller.js';
import { errors } from '../utils/errors.js';

const ERROR_TYPES = Object.freeze({
    exceededLenght: Object.freeze({
        name: '',
        code: '22001',
    }),
    invalidTypeData: Object.freeze({
        name: '',
        code: '22P02',
    }),
    duplicateValue: Object.freeze({
        name: '',
        code: '2305',
    }),
    invalidToken: Object.freeze({
        name: 'JsonWebTokenError',
    }),
    expiredToken: Object.freeze({
        name: 'TokenExpiredError',
    }),
});

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (config.mode === config.modes.development)
        errorController.sendErrorDev(err, res);

    if (config.mode === config.modes.production) {
        let error = err;

        if (err.parent?.code === ERROR_TYPES.exceededLenght.code)
            error = errors.handleCastError22001();
        if (err.parent?.code === ERROR_TYPES.invalidTypeData.code)
            error = errors.handleCastError22P02();
        if (err.parent?.code === ERROR_TYPES.duplicateValue.code)
            error = errors.handleCastError2305();
        if (err.name === ERROR_TYPES.expiredToken.name)
            error = errors.handleJWTExpiredError();
        if (err.name === ERROR_TYPES.invalidToken.name)
            error = errors.handleJWTError();

        errorController.sendErrorProd(error, res);
    }
};

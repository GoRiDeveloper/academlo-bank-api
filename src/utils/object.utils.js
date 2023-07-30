import { AppError } from './app.error.js';

export const objectUtils = Object.freeze({
    isObj: (obj) => {
        const isArr = Array.isArray(obj);
        if (isArr)
            throw new AppError('El Parametro No Es Un Objeto.', 500);
    },
});

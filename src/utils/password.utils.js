import bcrypt from 'bcryptjs';
import { config } from '../config/config.js';
import { AppError } from './app.error.js';

export const passwordUtils = Object.freeze({
    encrypt: async (password) => {
        const salt = await bcrypt.genSalt(config.salt);
        return await bcrypt.hash(password, salt);
    },
    compare: async (password, userPassword) => {
        const itsCorrect = await bcrypt.compare(
            password,
            userPassword
        );

        if (!itsCorrect)
            throw new AppError('La Contraseña Es Incorrecta.', 400);
    },
});

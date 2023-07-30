import { User } from '../models/User.model.js';
import { config } from '../config/config.js';
import { generateRandomInt } from '../utils/generate.random.number.js';
import { objectUtils } from '../utils/object.utils.js';
import { AppError } from '../utils/app.error.js';
import { passwordUtils } from '../utils/password.utils.js';
import { cleanData } from '../utils/clean.data.js';
import { generateJWT } from '../utils/jwt.js';

export const userService = Object.freeze({
    getUser: async (objProp, error) => {
        objectUtils.isObj(objProp);

        const user = await User.findOne({
            where: {
                ...objProp,
                status: true,
            },
        });

        if (!user && error)
            throw new AppError('La Cuenta No Existe.', 404);

        return user;
    },
    createUser: async (user) => {
        const accountNumber = generateRandomInt(
            config.maxAccountNumber
        );
        user.accountNumber = accountNumber;
        user.password = await passwordUtils.encrypt(user.password);

        const accountExists = await userService.getUser(
            { accountNumber },
            false
        );

        if (accountExists)
            throw new AppError('La Cuenta Ya Existe.', 409);

        const userSaved = await User.create(user);
        const token = await generateJWT(user.id);

        return {
            token,
            user: cleanData.user(userSaved),
        };
    },
    login: async (data) => {
        const { accountNumber, password } = data;
        const user = await userService.getUser(
            { accountNumber },
            true
        );

        await passwordUtils.compare(password, user.password);

        const token = await generateJWT(user.id);

        return {
            token,
            user: cleanData.user(user),
        };
    },
});

import { catchAsync } from '../utils/catch.async.js';
import { userService } from '../service/user.service.js';
import { transferService } from '../service/transfer.service.js';

export const userController = Object.freeze({
    create: catchAsync(async (req, res, next) => {
        const { token, user } = await userService.createUser(
            req.body
        );

        res.status(201).json({
            status: 'success',
            message: 'Usuario Registrado.',
            token,
            user,
        });
    }),
    findAll: catchAsync(async (req, res, next) => {
        const { transfers, count } =
            await transferService.getHistoryUser(req.user.id);

        res.status(200).json({
            status: 'success',
            totalTransfers: count,
            transfers,
        });
    }),
    findOne: catchAsync(async (req, res, next) => {
        const { token, user } = await userService.login(req.body);

        res.status(200).json({
            status: 'success',
            token,
            user,
        });
    }),
});

import { catchAsync } from '../utils/catch.async.js';
import { transferService } from '../service/transfer.service.js';

export const transferController = Object.freeze({
    create: catchAsync(async (req, res, next) => {
        const transfer = await transferService.sendTransfer(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Transferencia Realizada Con Éxito.',
            transfer,
        });
    }),
});

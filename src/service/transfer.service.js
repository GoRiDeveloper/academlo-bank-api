import { userService } from './user.service.js';
import { generateTransfer } from '../utils/generate.transfer.js';
import { Transfer } from '../models/Transfer.model.js';
import { cleanData } from '../utils/clean.data.js';

export const transferService = Object.freeze({
    sendTransfer: async (data) => {
        const {
            amount: amountToSend,
            accountNumber: senderAccountNumber,
            receiverAccountNumber,
        } = data;
        const senderUser = await userService.getUser(
            { accountNumber: senderAccountNumber },
            true
        );
        const receiverUser = await userService.getUser(
            { accountNumber: receiverAccountNumber },
            true
        );
        const transfer = await generateTransfer(
            amountToSend,
            senderUser,
            receiverUser
        );

        return await Transfer.create(transfer);
    },
    getHistoryUser: async (userId) => {
        const transfersInfo = await Transfer.findAndCountAll({
            where: {
                senderUserId: userId,
            },
        });
        const transfers = cleanData.transfers(transfersInfo.rows);

        return {
            count: transfersInfo.count,
            transfers,
        };
    },
});

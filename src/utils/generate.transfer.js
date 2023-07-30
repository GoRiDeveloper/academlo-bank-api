import { AppError } from './app.error.js';

export const generateTransfer = async (
    amountToSend,
    senderUser,
    receiverUser
) => {
    if (amountToSend > senderUser.amount)
        throw new AppError(
            'La Cantidad A Enviar Supera Tus Fondos.',
            400
        );

    const newSenderAmount = senderUser.amount - amountToSend;
    const newReceiverAmount = receiverUser.amount + amountToSend;

    await senderUser.update({ amount: newSenderAmount });
    await receiverUser.update({ amount: newReceiverAmount });

    const transfer = {
        amount: amountToSend,
        senderUserId: senderUser.id,
        receiverUserId: receiverUser.id,
    };

    return transfer;
};

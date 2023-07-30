export const cleanData = Object.freeze({
    user: (user) => {
        return {
            name: user.name,
            accountNumber: user.accountNumber,
            amount: user.amount,
            createdAt: user.createdAt || 'Información No Disponible.',
        };
    },
    transfers: (transfers) => {
        const cleanTransfers = transfers.map((transfer) => {
            return {
                amount: transfer.amount,
                senderUserId: transfer.senderUserId,
                receiverUserId: transfer.receiverUserId,
                createdAt: transfer.createdAt,
            };
        });
        return cleanTransfers;
    },
});

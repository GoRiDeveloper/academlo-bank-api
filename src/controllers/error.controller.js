export const errorController = Object.freeze({
    sendErrorDev: (error, res) => {
        console.log(error);

        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            stack: error.stack,
            error,
        });
    },
    sendErrorProd: (error, res) => {
        console.log(error);

        if (error.isOperational) {
            return res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            });
        } else {
            return res.status(500).json({
                status: 'fail',
                message: 'Algo Salio Mal :(',
            });
        }
    },
});

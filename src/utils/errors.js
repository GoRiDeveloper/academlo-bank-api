import { AppError } from './app.error.js';

export const errors = Object.freeze({
    handleCastError22001: () =>
        new AppError('La Longitud Fue Excedida.', 400),
    handleCastError22P02: () =>
        new AppError(
            'El Tipo De Dato En La Base De Datos Es Invalido.',
            400
        ),
    handleCastError2305: () =>
        new AppError(
            'El Valor Del Campo Ya Existe: Utiliza Otro Valor.',
            400
        ),
    handleJWTError: () => new AppError('El Token Es Invalido.', 401),
    handleJWTExpiredError: () =>
        new AppError(
            'El Token Ha Expirado, ¡Inicia Sesión De Nuevo!',
            401
        ),
});

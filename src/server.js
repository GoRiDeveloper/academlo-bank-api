import { app } from './app.js';
import { db } from './config/database.config.js';
import { config } from './config/config.js';
import { AppError } from './utils/app.error.js';

try {
    await db.authenticate();
    await db.sync();

    console.log('Base De Datos Autenticada Y Sincronizada 🥳.');
} catch (e) {
    console.log(e);
    throw new AppError(
        `Ocurrio Un Error Al Conectar La Base De Datos. Error : "${e.message}"`,
        500
    );
}

app.listen(config.serverPort, () =>
    console.log(`Conectado En El Puerto : ${config.serverPort}.`)
);

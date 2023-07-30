import { config as envConfig } from 'dotenv';

envConfig();

const env = process.env;

export const config = Object.freeze({
    serverPort: +env.PORT || 0,
    mode: env.MODE,
    secret: env.SECRET,
    jwtSecret: env.SECRET_JWT_SEED,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    salt: +env.SALT,
    maxAccountNumber: +env.MAX_ACC_NUM,
    modes: Object.freeze({
        development: 'dev',
        production: 'prod',
    }),
    dbConfig: Object.freeze({
        dialect: env.DB_DIALECT,
        database: env.DB_NAME,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        host: env.DB_HOST,
        port: +env.DB_PORT,
        logging: false,
    }),
});

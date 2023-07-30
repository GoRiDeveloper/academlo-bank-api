import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const jwtCallBack = (res, rej) => {
    return (err, token) => (err ? rej(err) : res(token));
};

export const generateJWT = (data) =>
    new Promise((res, rej) => {
        jwt.sign(
            { data },
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn },
            jwtCallBack(res, rej)
        );
    });

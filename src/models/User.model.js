import { DataTypes } from 'sequelize';
import { db } from '../config/database.config.js';

export const User = db.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER(),
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(70),
    },
    accountNumber: {
        unique: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING(85),
    },
    amount: {
        allowNull: false,
        defaultValue: 1000,
        type: DataTypes.FLOAT,
    },
    status: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
    },
});

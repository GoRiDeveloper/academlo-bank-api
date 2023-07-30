import { DataTypes } from 'sequelize';
import { db } from '../config/database.config.js';

export const Transfer = db.define('transfers', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    senderUserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    receiverUserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
});

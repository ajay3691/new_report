import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secretCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admin'
});
Admin.sync()
    .then(() => {
        console.log('Admin table created successfully.');
    })
    .catch(error => {
        console.error('Error creating User table:', error);
    });


export default Admin;

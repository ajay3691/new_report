import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js';

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirm_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'abc'
});
User.sync()
    .then(() => {
        console.log('User table created successfully.');
    })
    .catch(error => {
        console.error('Error creating User table:', error);
    });

export default User;

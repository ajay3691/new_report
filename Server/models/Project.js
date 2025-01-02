// models/Project.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Project extends Model {}

Project.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects'
});

Project.sync()
    .then(() => {
        console.log('Project table created successfully.');
    })
    .catch(error => {
        console.error('Error creating User table:', error);
    });

export default Project;

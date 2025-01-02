// models/Subcategory.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Project from './Project.js';

class Subcategory extends Model {}

Subcategory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Subcategory',
    tableName: 'subcategories'
});

Project.hasMany(Subcategory, { foreignKey: 'projectId' });
Subcategory.belongsTo(Project, { foreignKey: 'projectId' });

Subcategory.sync()
    .then(() => {
        console.log('subcatogiry table created successfully.');
    })
    .catch(error => {
        console.error('Error creating User table:', error);
    });

export default Subcategory;

import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Employee from './Employee.js';
import Subcategory from './Subcategory.js';

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id',
        },
        allowNull: false,
    },
    subcategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Subcategory,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'reports',
});

Employee.hasMany(Report, { foreignKey: 'employeeId' });
Report.belongsTo(Employee, { foreignKey: 'employeeId' });

Subcategory.hasMany(Report, { foreignKey: 'subcategoryId' });
Report.belongsTo(Subcategory, { foreignKey: 'subcategoryId' });

Report.sync()
    .then(() => {
        console.log('report table created successfully.');
    })
    .catch(error => {
        console.error('Error creating User table:', error);
    });

export default Report;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Subcategory from './Subcategory.js';
import Employee from './Employee.js';

class Report extends Model {}

Report.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    report: {
        type: DataTypes.STRING,
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
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id',
        },
        allowNull: false,
    },
    reportDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Report',
    tableName: 'reports'
});

// Define associations
Subcategory.hasMany(Report, { foreignKey: 'subcategoryId' });
Report.belongsTo(Subcategory, { foreignKey: 'subcategoryId' });

Employee.hasMany(Report, { foreignKey: 'employeeId' });
Report.belongsTo(Employee, { foreignKey: 'employeeId' });

Report.sync()
    .then(() => {
        console.log('Report table created successfully.');
    })
    .catch(error => {
        console.error('Error creating Report table:', error);
    });

export default Report;

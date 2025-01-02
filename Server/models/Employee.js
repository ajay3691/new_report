import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Employee = sequelize.define('Employee', {
  
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  employee_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mobile_no: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,

  sequelize, // Passing the `sequelize` instance is necessary
  modelName: 'Employee',
  tableName: 'employee',
});

// Sync the model with the database
Employee.sync()
  .then(() => {
    console.log('Employee table created successfully.');
  })
  .catch(error => {
    console.error('Error creating Employee table:', error);
  });

export default Employee;

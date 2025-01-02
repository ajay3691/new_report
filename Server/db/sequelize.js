import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
        timestamps: true,
        underscored: true,
    },
});




/// Test the database connection
/*  sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    }); 
  */

    export default sequelize;

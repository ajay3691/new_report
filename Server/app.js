import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AdminRoute from './routes/AdminRoute.js';
import Report from './routes/ReportRoute.js';
import  cors from 'cors'
//import ProjectRoute from './routes/ProjectRoute.js';
//import ProductRoute from './routes/ProductRoute.js';
import sequelize from './db/sequelize.js';
import Report1 from './routes/ReportRoute1.js'
import Report2 from './routes/ReportRoute2.js'
import EmployeeRoute from './routes/EmployeeRoute.js'

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

//app.use('/api', ProductRoute);
//app.use('/', ProjectRoute);
app.use('/', AdminRoute);
app.use('/', EmployeeRoute);
//app.use('/', Report);
app.use('/', Report1);
app.use('/api', Report2);


const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';

sequelize.authenticate()
    .then(async () => {
        console.log('Database connection has been established successfully.');
        // Get the name of the connected database
        const dbName = sequelize.config.database;
        console.log('Connected to database:', dbName);

        // Get the names of all tables in the connected database
        const tableNames = await sequelize.getQueryInterface().showAllTables();
        console.log('Tables in the database:', tableNames.join(', '));

        // Start the Express server
        app.listen(PORT, HOST, () => {
            console.log(`Server running on http://${HOST}:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

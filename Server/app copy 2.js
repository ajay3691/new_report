// app.js

import express from 'express';
import { sequelize, connectDatabase } from './db/database.js';
import productRoute from './routes/ProductRouter.js';
import UserRouter from './routes/UserRouter.js'
import dotenv from 'dotenv';
import morgan from 'morgan';


const app = express();

// Loading environment variables using dotenv package
dotenv.config({ path: './config/config.env' });

const port = process.env.PORT;
const host = process.env.HOST;

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Use morgan for logging requests in dev mode

app.get("/", (req, resp) => {
    resp.send("<h1>Home Page</h1>");
});
app.use('/api', productRoute);
app.use('/user', UserRouter);


// Create the database if it doesn't exist
//createDatabase().then(() => {
    // Connect to the database and start the server
    connectDatabase().then(() => {
        app.listen(port, host, (err) => {
            if (err) {
                console.error('Error starting server:', err);
            } else {
                console.log(`Server Running on http://${host}:${port}`);
            }
        });
    });
//});

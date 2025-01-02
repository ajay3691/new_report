import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import morgan from 'morgan'; // Import Morgan for logging

import AuthRoute from './routes/AuthRoute.js'
import ProductRoute from './routes/ProductRoute.js'
const app = express();
app.use(express.json());
app.use(morgan('dev')); // Use Morgan middleware with 'dev' format for logging


app.get("/", (req, resp) => {
  resp.send("Express App - Root APi.......")
})
app.use("api",ProductRoute)
app.use("user",AuthRoute)

// Retrieve database connection details from environment variables
dotenv.config({ path: './config/config.env' });
const port = process.env.PORT || 9000;
const host = process.env.HOST || 'localhost';
const db_name = process.env.DB_NAME


const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT /* ? parseInt(process.env.DB_PORT) : 3306, */
});

con.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log("SQL Connection successful");

    // Create the 'school' database if it doesn't exist
    con.query(`CREATE DATABASE IF NOT EXISTS ${db_name}`, function (err, result) {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log(`Database '${db_name}' created or already exists`);
    });

    // Use the 'school' database
    con.query(`USE ${db_name}`, function (err, result) {
        if (err) {
            console.error('Error selecting database:', err);
            return;
        }
        console.log(`Using database '${db_name}'`);
    }); 
});



// Use product routes with base path '/products'
app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});


/* app.get('/', async (req, res) => {
    try {
        res.json("Express app running Root api.....");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); */



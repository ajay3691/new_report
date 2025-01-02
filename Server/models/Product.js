import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

class Product {
    constructor() {
        // Call the function to create the table
        this.createTable();
    }

    async createTable() {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });

            const createTableQuery = `
            CREATE TABLE IF NOT EXISTS prods (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                qty INT NOT NULL DEFAULT 0,     -- Removed semicolon (;)
                description VARCHAR(255) NOT NULL
            )            
            `;
            await connection.execute(createTableQuery);
            console.log('Table "products" created successfully');
            await connection.end();
        } catch (error) {
            console.error('Error creating table:', error.message);
        }
    }


    async getAllProducts() {
        return this.query('SELECT * FROM products');
    }

    async getProductById(id) {
        return this.query('SELECT * FROM products WHERE id = ?', [id]);
    }

    async createProduct(productData) {
        return this.query('INSERT INTO products SET ?', productData);
    }

    async updateProduct(id, productData) {
        return this.query('UPDATE products SET ? WHERE id = ?', [productData, id]);
    }

    async deleteProduct(id) {
        return this.query('DELETE FROM products WHERE id = ?', [id]);
    }

    async query(sql, args) {
        return new Promise((resolve, reject) => {
            pool.query(sql, args, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
}

export default Product;

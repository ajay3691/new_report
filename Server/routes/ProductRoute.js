import express from 'express';
import Product from '../models/Product.js'; // Assuming Product class is defined in a separate file

const router = express.Router();
const product = new Product();
/* 
// Add a new product
router.post('/products', async (req, res) => {
    const { name, price, qty, description } = req.body;
    try {
        const result = await product.createProduct({ name, price, qty, description });
        res.status(201).json({ id: result.insertId, name, price, qty, description });
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing product
router.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price, qty, description } = req.body;
    try {
        await product.updateProduct(productId, { name, price, qty, description });
        res.json({ id: productId, name, price, qty, description });
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all products
router.get('/products', async (req, res) => {
    try {
        const products = await product.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET a single product by ID
router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const singleProduct = await product.getProductById(productId);
        if (singleProduct.length === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(singleProduct[0]);
        }
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await product.deleteProduct(productId);
        res.status(204).send();
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 */
export default router;

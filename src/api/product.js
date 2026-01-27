import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Fetch all products
export const getProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
};

// Fetch a single product by ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch product with id: ${id}`);
    }
};

// Create a new product
export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${BASE_URL}/products`, productData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to create product');
    }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${BASE_URL}/products/${id}`, productData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update product with id: ${id}`);
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/products/${id}`);
        return response.data;
    }  catch (error) {
        throw new Error(`Failed to delete product with id: ${id}`);
    }
};

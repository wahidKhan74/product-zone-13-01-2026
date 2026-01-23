const BASE_URL = 'http://localhost:3000';

// Fetch all products
export const getProducts = async() => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

// Fetch a single product by ID
export const getProductById = async(id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product with id: ${id}`);
    }
    return response.json();
};

// Create a new product
export const createProduct = async(productData) => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return response.json();
};

// Update an existing product
export const updateProduct = async(id, productData) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error(`Failed to update product with id: ${id}`);
    }
    return response.json();
};

// Delete a product
export const deleteProduct = async(id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete product with id: ${id}`);
    }
    return response.json();
};
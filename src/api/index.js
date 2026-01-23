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

// Search products by name
export const searchProducts = async(query) => {
    const response = await fetch(`${BASE_URL}/products?search=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to search products');
    }
    return response.json();
};


// Add a product to cart
export const addToCart = async(productId, quantity) => {
    const response = await fetch(`${BASE_URL}/carts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) {
        throw new Error('Failed to add product to cart');
    }
    return response.json();
}

// Fetch cart items
export const getCartItems = async() => {
    const response = await fetch(`${BASE_URL}/carts`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart items');
    }
    return response.json();
};

// Remove item from cart
export const removeFromCart = async(itemId) => {
    const response = await fetch(`${BASE_URL}/carts/${itemId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to remove item with id: ${itemId} from cart`);
    }
    return response.json();
};
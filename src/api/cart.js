const BASE_URL = 'http://localhost:3000';

// Add item to cart
export const addItemToCart = async(item) => {
    const response = await fetch(`${BASE_URL}/carts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error('Failed to add item to cart');
    }
    return response.json();
};

// Remove item from cart
export const removeItemFromCart = async(itemId) => {
    const response = await fetch(`${BASE_URL}/carts/${itemId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to remove item from cart');
    }
    return response.json();
};

// Fetch cart items
export const fetchCartItems = async() => {
    const response = await fetch(`${BASE_URL}/carts?userId=2`); // Assuming userId=2 for demo
    if (!response.ok) {
        throw new Error('Failed to fetch cart items');
    }
    return response.json();
};

// Update cart item quantity
export const updateCartItemQuantity = async(cartId, updatedItems) => {
    const response = await fetch(`${BASE_URL}/carts/${cartId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: updatedItems  }),
    });
    if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
    }
    return response.json();
};

// Clear cart
export const clearCart = async() => {
    const response = await fetch(`${BASE_URL}/carts/clear`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to clear cart');
    }
    return response.json();
};

// Checkout cart
export const checkoutCart = async() => {
    const response = await fetch(`${BASE_URL}/carts/checkout`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to checkout cart');
    }
    return response.json();
};

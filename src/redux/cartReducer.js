import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart, fetchCartItems, updateCartItemQuantity } from "../api/cart";


/**
 * Cart state shape:
 * {
 *   id: string,
 *   userId: string,
 *   items: [{ productId, quantity }]
 * }
 */

// 2. create cart slice with initial state and reducers
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        id: null,
        userId: null,
        items: [],
    },
    reducers: {
        setCartItems(state, action) {
            return action.payload;
        },
        addItem(state, action) {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ productId, quantity });
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.productId !== action.payload);
        },
        updateItemQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.productId === productId);
            if (item) {
                item.quantity = quantity;
            }
        },
        
    },
});

export const { addItem, removeItem , updateItemQuantity, setCartItems} = cartSlice.actions;
export default cartSlice.reducer;

// thunk to add item to cart
export const addItemToCartThunk = (productId, quantity=1) => async (dispatch) => {
    try {
        const addedItem = await addItemToCart({ productId, quantity });
        dispatch(addItem(addedItem));
    } catch (error) {
        console.error("Failed to add item to cart:", error);
    }
};

// thunk to remove item from cart
export const removeItemFromCartThunk = (productId) => async (dispatch) => {
    try {
        const updatedCart = await removeItemFromCart(productId);
        dispatch(setCartItems(updatedCart));
    }
    catch (error) {
        console.error("Failed to remove item from cart:", error);
    }
};

// thunk to fetch cart items
export const fetchCartItemsThunk = () => async (dispatch) => {
    try {
        const cartItems = await fetchCartItems();
        dispatch(setCartItems(cartItems[0])); // Assuming single cart for demo
    } catch (error) {
        console.error("Failed to fetch cart items:", error);
    }
};

// thunk to update cart item quantity
export const updateCartItemQuantityThunk = ({cartId, items}) => async (dispatch) => {
    try {
        const updatedCart = await updateCartItemQuantity(cartId, items);
        dispatch(setCartItems(updatedCart));
    } catch (error) {
        console.error("Failed to update cart item quantity:", error);
    }
};
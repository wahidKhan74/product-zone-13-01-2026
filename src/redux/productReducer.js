
// create a slice for products
import { createSlice } from '@reduxjs/toolkit';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../api';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.items = action.payload;
            state.loading = false;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        // Additional reducers for create, update, delete can be added here
        // fetch product by id 
        fetchProductByIdSuccess(state, action) {
            const index = state.items.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            } else {
                state.items.push(action.payload);
            }
        },
        fetchProductByIdFailure(state, action) {
            state.error = action.payload;
        },

    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure ,
    fetchProductByIdSuccess, fetchProductByIdFailure,
} = productSlice.actions;

// thunk to fetch products
export const fetchProducts = () => async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
        const products = await getProducts();
        dispatch(fetchProductsSuccess(products));
    } catch (error) {
        dispatch(fetchProductsFailure(error.toString()));
    }
};

// thunk to fetch product by id
export const fetchProductById = (id) => async (dispatch) => {
    try {
        // api call get to product by id
        const product = await getProductById(id);
        dispatch(fetchProductByIdSuccess(product));
    } catch (error) {
        dispatch(fetchProductByIdFailure(error.toString()));
    }
};

export default productSlice.reducer;
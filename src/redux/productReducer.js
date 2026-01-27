
// create a slice for products
import { createSlice } from '@reduxjs/toolkit';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../api';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        selectedProduct: null,
        error: null,
    },
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.items = action.payload;
            state.selectedProduct = action.payload;
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

        // create product
        createProductSuccess(state, action) {
            state.items.push(action.payload);
        },
        createProductFailure(state, action) {
            state.error = action.payload;
        },

        // update product
        updateProductSuccess(state, action) {
            const index = state.items.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        updateProductFailure(state, action) {
            state.error = action.payload;
        },
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        },

        // delete product
        deleteProductSuccess(state, action) {
            state.items = state.items.filter(product => product.id !== action.payload);
        },
        deleteProductFailure(state, action) {
            state.error = action.payload;
        }

    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure ,
    fetchProductByIdSuccess, fetchProductByIdFailure,createProductSuccess, createProductFailure,
    updateProductSuccess, updateProductFailure, clearSelectedProduct, deleteProductSuccess, deleteProductFailure
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

// thunk to create product
export const createNewProduct = (productData) => async (dispatch) => {
    try {
        const newProduct = await createProduct(productData);
        console.log('====================================');
        console.log(newProduct);
        console.log('====================================');
        dispatch(createProductSuccess(newProduct));
    } catch (error) {
        dispatch(createProductFailure(error.toString()));
    }
};

// thunk to update product
export const updateExistingProduct = (id, productData) => async (dispatch) => {
    try {
        const updatedProduct = await updateProduct(id, productData);
        dispatch(updateProductSuccess(updatedProduct));
    } catch (error) {
        dispatch(updateProductFailure(error.toString()));
    }
};

// thunk to delete product
export const deleteExistingProduct = (id) => async (dispatch) => {
    try {
        await deleteProduct(id);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure(error.toString()));
    }
};

export default productSlice.reducer;